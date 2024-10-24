import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'
import router from '@/router/index'
export interface ITab {
  path: string
  title: string
  doNotClose: boolean
}
export const useTabStore = defineStore(
  'tabStore',
  () => {
    const exclude = ref<string>('')
    const showComponent = ref<boolean>(true)
    const tabList = ref<ITab[]>([
      {
        path: '/',
        title: '首页',
        doNotClose: true,
      },
    ])
    const currentTab = ref<string>('/')
    const addTab = (tab: ITab): boolean => {
      const item = tabList.value.find((item) => item.path === tab.path)
      if (item) {
        return false
      } else {
        tabList.value.push(tab)
        return true
      }
    }
    const removeTab = (path: string): void => {
      // 找到当前的索引
      const index = tabList.value.findIndex((item) => item.path === path)
      if (tabList.value[index].doNotClose) {
        return
      }
      const overAllLength = tabList.value.length - 1
      // 删除的是当前选中的
      if (currentTab.value === path) {
        if (overAllLength === index) {
          currentTab.value = tabList.value[index - 1].path
        } else {
          currentTab.value = tabList.value[index + 1].path
        }
        tabList.value.splice(index, 1)
        router.push(currentTab.value).then()
      } else {
        tabList.value.splice(index, 1)
      }
    }
    const setCurrentTab = (path: string): void => {
      currentTab.value = path
    }
    const removeAllTab = (): void => {
      tabList.value = tabList.value.filter((item) => item.doNotClose)
      const { path } = tabList.value.at(-1) || {}
      currentTab.value = path ?? '/'
      router.push(currentTab.value).then()
    }
    const removeOtherTab = (): void => {
      tabList.value = tabList.value.filter((tab: ITab) => {
        return tab.doNotClose || tab.path === currentTab.value
      })
    }
    // 重新加载
    const reload = () => {
      exclude.value = router.currentRoute.value.name as string
      showComponent.value = false
      nextTick(() => {
        exclude.value = ''
        showComponent.value = true
      }).then()
    }
    return {
      exclude,
      currentTab,
      tabList,
      showComponent,
      addTab,
      removeTab,
      setCurrentTab,
      removeAllTab,
      removeOtherTab,
      reload,
    }
  },
  { persist: true },
)
