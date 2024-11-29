import { defineStore } from 'pinia'
import { ref } from 'vue'
export enum ShowTypeMode {
  Mobile = 'mobile',
  PC = 'pc',
  Pad = 'pad',
  LargeScreen = 'largeScreen',
}
export enum ScreenSize {
  Mobile = 768,
  PC = 1024,
  Pad = 1280,
}

export const useLayoutStore = defineStore('layoutStore', () => {
  // 当前模式
  const currentMode = ref<string>('')
  // 控制个人设置抽屉展开收起
  const showPersonalSet = ref<boolean>(false)
  // 控制菜单是否收起
  const menuCollapse = ref<boolean>(false)
  // 显示菜单收起按钮
  const showMenuCollapseBtn = ref<boolean>(true)
  // 显示菜单抽屉
  const showMenuDrawer = ref<boolean>(false)
  // 控制菜单抽屉展开收起
  const menuDrawer = ref<boolean>(false)
  // 控制面包屑显示
  const showBreadcrumb = ref<boolean>(false)
  const setDisplayMode = (mode: string) => {
    switch (mode) {
      case ShowTypeMode.PC:
        setPcMode(ShowTypeMode.PC)
        break
      case ShowTypeMode.Pad:
        setPadMode(ShowTypeMode.Pad)
        break
      case ShowTypeMode.Mobile:
        setMobileMode(ShowTypeMode.Mobile)
        break
      default:
        setPcMode(ShowTypeMode.PC)
        break
    }
  }
  // 平板模式
  const setPadMode = (mode: ShowTypeMode) => {
    if (mode === currentMode.value) return
    currentMode.value = mode
    // 显示面包屑
    showBreadcrumb.value = true
    // 菜单折起
    menuCollapse.value = true
    // 显示切换收起按钮
    showMenuCollapseBtn.value = true
    // 菜单抽屉不显示
    showMenuDrawer.value = false
  }
  // PC模式
  const setPcMode = (mode: ShowTypeMode) => {
    if (mode === currentMode.value) return
    currentMode.value = mode
    showBreadcrumb.value = true
    showMenuCollapseBtn.value = true
    showMenuDrawer.value = false
    menuCollapse.value = false
  }
  // 移动端模式
  const setMobileMode = (mode: ShowTypeMode) => {
    if (mode === currentMode.value) return
    currentMode.value = mode
    showBreadcrumb.value = false
    showMenuDrawer.value = true
    menuCollapse.value = false
    showMenuCollapseBtn.value = false
  }
  return {
    menuDrawer,
    setDisplayMode,
    showMenuDrawer,
    menuCollapse,
    showBreadcrumb,
    showMenuCollapseBtn,
    showPersonalSet,
    currentMode,
  }
})
