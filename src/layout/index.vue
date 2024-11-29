<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-drawer
          v-if="showMenuDrawer"
          v-model="menuDrawer"
          direction="ltr"
          :with-header="false"
          class="menu_drawer"
        >
          <Menu></Menu>
        </el-drawer>
        <el-aside
          v-else
          class="left-container"
          :style="{ width: menuCollapse ? '65px' : '200px' }"
        >
          <Menu></Menu>
        </el-aside>

        <el-container>
          <el-header>
            <HeaderTop></HeaderTop>
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
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { debounce } from 'lodash-es'
import { storeToRefs } from 'pinia'
import Menu from '@/layout/components/VerticalMenu/index.vue'
import TabList from '@/layout/components/Tab/TabList.vue'
import HeaderTop from '@/layout/components/Header/HeaderTop.vue'
import PersonalSettings from '@/layout/components/PersonalSettings/index.vue'
defineOptions({
  name: 'layoutPage',
})
import {
  useLayoutStore,
  ScreenSize,
  ShowTypeMode,
} from '@/store/modules/layoutStore'
import { useTabStore } from '@/store/modules/tabStore'
const tabStore = useTabStore()
const layoutStore = useLayoutStore()
const { showMenuDrawer, showPersonalSet, menuDrawer, menuCollapse } =
  storeToRefs(layoutStore)
// 元素监视器
const resizeObserver = ref<ResizeObserver>()
const setAdaptive = () => {
  resizeObserver.value = new ResizeObserver(
    debounce((entries: any) => {
      const { width } = entries[0].contentRect
      if (width < ScreenSize.Mobile) {
        layoutStore.setDisplayMode(ShowTypeMode.Mobile)
      } else if (width >= ScreenSize.Mobile && width < ScreenSize.Pad) {
        layoutStore.setDisplayMode(ShowTypeMode.Pad)
      } else {
        layoutStore.setDisplayMode(ShowTypeMode.PC)
      }
    }, 100),
  )
  const body = document.querySelector('body')
  resizeObserver.value.observe(body as Element, {})
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
