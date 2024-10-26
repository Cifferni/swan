<template>
  <div>
    <!--    <SystemLoading v-show="isShowLoading"></SystemLoading>-->
    <div v-show="!isShowLoading" class="common-layout">
      <el-container>
        <el-aside
          class="left-container"
          :style="{ width: collapse ? '65px' : '200px' }"
          v-if="!mobileMode"
        >
          <Menu></Menu>
        </el-aside>
        <el-drawer
          v-else
          v-model="menuDrawer"
          direction="ltr"
          :with-header="false"
          class="menu_drawer"
        >
          <Menu></Menu>
        </el-drawer>
        <el-container>
          <el-header>
            <HeaderTop
              @openPersonalSet="openPersonalSet"
              @openMenuDrawer="openMenuDrawer"
              :mobileMode="mobileMode"
            ></HeaderTop>
            <TabList></TabList>
          </el-header>
          <el-main>
            <div class="router-view">
              <router-view v-slot="{ Component, route }">
                <transition mode="out-in">
                  <keep-alive :max="10" :exclude="tabStore.exclude">
                    <component
                      :key="route.path"
                      :is="Component"
                      v-if="tabStore.showComponent"
                    />
                  </keep-alive>
                </transition>
              </router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
      <PersonalSettings v-model="showPersonalSet"></PersonalSettings>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Menu from '@/layout/components/VerticalMenu/index.vue'
import TabList from '@/layout/components/Tab/TabList.vue'
import HeaderTop from '@/layout/components/Header/HeaderTop.vue'
import PersonalSettings from '@/layout/components/PersonalSettings/index.vue'
import useVerticalMenu from '@/hook/useVerticalMenu'
import { useTabStore } from '@/store/modules/tabStore'
import { debounce } from 'lodash-es'
import { nextTick, onBeforeMount, onBeforeUnmount, ref } from 'vue'
const tabStore = useTabStore()
const { setCollapse, isShowCollapse, collapse } = useVerticalMenu()
defineOptions({
  name: 'layoutPage',
})
// 元素监视器
const resizeObserver = ref<ResizeObserver>()
// 控制菜单抽屉显示
const menuDrawer = ref<boolean>(false)
// 是否是移动端模式
const mobileMode = ref<boolean>(false)
//loading 组件
const isShowLoading = ref<boolean>(true)
// 控制个人设置抽屉显示
const showPersonalSet = ref<boolean>(false)
enum ShowTypeMode {
  mobile = 'mobile',
  pc = 'pc',
}

const setShowMode = (mode: string) => {
  // 判断当前模式是否为移动设备模式
  const isMobile = mode === ShowTypeMode.mobile
  // 如果当前移动设备模式与之前的不同，则更新相关状态
  if (mobileMode.value !== isMobile) {
    // 更新移动设备模式状态
    mobileMode.value = isMobile
    // 根据是否是移动设备模式来设置菜单折叠状态
    isShowCollapse.value = !isMobile
    // 设置菜单不处于折叠状态
    setCollapse(false)
    // 关闭菜单抽屉
    menuDrawer.value = false
  }
  nextTick(() => {
    isShowLoading.value = false
  })
}
const setAdaptive = () => {
  resizeObserver.value = new ResizeObserver(
    debounce((entries: any) => {
      const { width } = entries[0].contentRect
      if (width > 0 && width < 768) {
        setShowMode(ShowTypeMode.mobile)
      } else if (width >= 768 && width < 1024) {
        setShowMode(ShowTypeMode.pc)
      } else if (width >= 1024 && width < 1280) {
        setShowMode(ShowTypeMode.pc)
      } else {
        setShowMode(ShowTypeMode.pc)
      }
    }, 100),
  )
  const body = document.querySelector('body')
  resizeObserver.value.observe(body as Element, {})
}
const openPersonalSet = (value: boolean) => {
  showPersonalSet.value = value
}
const openMenuDrawer = () => {
  menuDrawer.value = true
}
onBeforeMount(() => {
  setAdaptive()
})
onBeforeUnmount(() => {
  resizeObserver.value?.disconnect()
})
</script>

<style scoped lang="scss">
.common-layout {
  :deep(.menu_drawer) {
    width: 50% !important;
    padding: 0;
    .el-drawer__body {
      padding: 0;
    }
  }
  .left-container {
    border-right: 1px solid var(--el-border-color-lighter);
    position: relative;
    overflow: visible;
    transition: width 0.3s ease;
    background: var(--el-bg-color);
    :deep(.el-drawer__body) {
      padding: 0;
    }
  }
  .el-header {
    height: auto;
    box-sizing: border-box;
    padding: 0;
    box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.1);
    background: var(--el-bg-color);
  }
  .el-main {
    height: calc(100vh - $header-height);
    background: var(--el-bg-color-page);
    .router-view {
      height: 100%;
      background: var(--el-bg-color);
    }
  }
}
</style>
