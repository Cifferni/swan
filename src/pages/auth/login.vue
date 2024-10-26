<template>
  <div class="flex justify-center items-center h-full">
    <!--  左侧背景区  -->
    <!--    -->
    <div
      class="relative overflow-hidden transform origin-right transition-all duration-300 w-0 h-full sm:w-5/12 md:w-7/12 lg:w-8/12 xl:w-9/12"
    >
      <el-image
        class="h-full w-full"
        :src="loginBg"
        fit="cover"
        alt="企业图片"
      />
      <div
        class="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-50 text-[20px]"
      >
        鸿鹄，指的是大雁和天鹅，常用以比喻志向高远、才情出众的人。在古代文人墨客的诗词中，"鸿鹄"常被用来代表对理想和目标的追求，象征着非凡的抱负和希望。
      </div>
    </div>
    <!-- 右侧-->
    <div
      class="relative transition-all duration-300 w-full h-full sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-3/12"
    >
      <!--  输入部分    -->
      <div
        class="w-4/5 h-auto absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col"
      >
        <!--    欢迎    -->
        <div class="mt-6 text-3xl font-bold text-gray-900 text-center">
          欢迎登录
        </div>
        <el-form :model="loginInfo" :rules="loginFormRules" ref="ruleFormRef">
          <el-form-item
            class="login-from__label"
            label="账号"
            label-position="top"
            prop="userName"
          >
            <el-input
              placeholder="请输入账号"
              v-model="loginInfo.userName"
              :prefix-icon="User"
              clearable
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            class="login-from__label"
            label="密码"
            label-position="top"
            prop="password"
          >
            <el-input
              type="password"
              v-model="loginInfo.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              autocomplete="off"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item class="overflow-hidden">
            <el-button
              class="w-full rounded-md !h-[40px] mt-2"
              type="primary"
              :loading="isLoading"
              @click="onSubmit(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import loginBg from '@/assets/images/auth/loginbg.png'
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { type FormInstance, type FormRules, ElMessage } from 'element-plus'

import { useRouter } from 'vue-router'
import useAuth from '@/hook/useAuth'
const { token, login, getUserInfo } = useAuth()
defineOptions({ name: 'loginPage' })
const router = useRouter()
// 登录信息类型
interface ILoginInfo {
  userName: string
  password: string
}
// 登录信息
const loginInfo = reactive<ILoginInfo>({
  userName: '',
  password: '',
})
// 表单实例
const ruleFormRef = ref<FormInstance>()
// 是否显示登录按钮loading
let isLoading = ref<boolean>(false)
// 账号校验
const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账户'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
// 检验规则
const loginFormRules = reactive<FormRules<typeof loginInfo>>({
  userName: [{ validator: validateUserName, trigger: 'change' }],
  password: [{ validator: validatePassword, trigger: 'change' }],
})
// 登录
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        isLoading.value = true
        await login<ILoginInfo>(loginInfo)
        await getUserInfo(token.value)
        isLoading.value = false
        await router.replace('/')
      } catch (e: any) {
        isLoading.value = false
        ElMessage({
          message: e.message,
          type: 'error',
          plain: true,
        })
      }
    } else {
      console.log('error submit!')
    }
  })
}
</script>
<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login-from__label {
  margin-top: 4px;
}
:deep(.el-form-item__label) {
  font-size: 14px;
  font-weight: bold;
}
</style>
