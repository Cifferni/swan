import { createRouter, createWebHashHistory } from 'vue-router'
import { constRoutes } from './routes/constRoutes'
import { isEmpty } from 'lodash-es'
import { ElMessage } from 'element-plus'
import useAuth from '@/hook/useAuth'
import { start, stop } from '@/utils/index'
const router = createRouter({
  // 修改history模式，要不然刷新404,使用HTML5的话需要配置nginx
  history: createWebHashHistory(),
  routes: constRoutes,
  scrollBehavior() {
    // 可以在这里还原上次的滚动位置。
    return { top: 0, left: 0 }
  },
})
router.beforeEach(async (to, from) => {
  start()
  const { getUserInfo, clearUserInfo, userInfo } = useAuth()

  const token = JSON.parse(<string>window.localStorage.getItem('token'))
  // debugger;
  // 判断是否含有token
  if (token) {
    if (to.name === 'login') {
      return { path: from.fullPath }
    }
    // 说明登录了
    if (isEmpty(userInfo.value)) {
      try {
        await getUserInfo(token)
        await router.push(to.fullPath)
      } catch (e: any) {
        //如果token获取失败,代表token可能过期
        //把用户过期的清除掉,
        clearUserInfo()
        ElMessage({
          message: e.message,
          type: 'error',
          plain: true,
        })
        return { path: '/login' }
      }
    }
  } else {
    // 避免无限重定向t
    if (to.name !== 'login') {
      // 将用户重定向到登录页面
      return { path: 'login' }
    }
  }
})
router.afterEach(() => {
  stop() //进入之后关闭进度条
})
export default router
