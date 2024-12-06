<template>
  <div class="tab-container">
    <div class="tab-container_left">
      <VueDraggable
        v-model="tabStore.tabList"
        dragClass="drag"
        handle="#containerTab .el-tabs__nav .el-tabs__item"
        target="#containerTab .el-tabs__nav"
        :animation="150"
        :delay="1"
        :fallbackTolerance="3"
        style="height: 100%"
      >
        <el-tabs
          v-model="currentTab"
          type="card"
          class="tab-container_tab"
          id="containerTab"
          @tab-change="onTabChange"
          @tab-remove="onTabRemove"
        >
          <el-tab-pane
            v-for="(item, index) in tabStore.tabList"
            :closable="!item.doNotClose"
            :key="index"
            :label="$t(`menu.${item.title}`)"
            :name="item.path"
            :class="{ flicker: index === tabStore.tabList.length - 1 }"
          ></el-tab-pane>
        </el-tabs>
      </VueDraggable>
    </div>
    <el-dropdown trigger="click" class="tab_dropdown">
      <el-icon class="h-full w-full"><arrow-down /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="reload">
            <el-icon>
              <i class="iconfont icon-shuaxin"></i>
            </el-icon>
            重新加载
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="currentTab === '/'"
            @click="closeCurrentTab"
          >
            <el-icon>
              <i class="iconfont icon-guanbidangqian"></i>
            </el-icon>
            关闭当前页签
          </el-dropdown-item>
          <el-dropdown-item @click="changeFullscreen">
            <el-icon>
              <i
                :class="[
                  'iconfont',
                  isFullscreen ? 'icon-cancel-full' : 'icon-full',
                ]"
              ></i>
            </el-icon>
            {{ isFullscreen ? '取消全屏' : '全屏' }}
          </el-dropdown-item>
          <el-dropdown-item divided @click="removeOtherTab">
            <el-icon>
              <i class="iconfont icon-guanbiqitabiaoqianye"></i>
            </el-icon>
            关闭其他页签
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="tabList.length <= 1"
            @click="removeAllTab"
          >
            <el-icon>
              <i class="iconfont icon-guanbiquanbu"></i>
            </el-icon>
            关闭全部页签
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router'
import { type ITab, useTabStore } from '@/store/modules/tabStore'
import { VueDraggable } from 'vue-draggable-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import screenFull from 'screenfull'
const router = useRouter()
const route = useRoute()
const tabStore = useTabStore()
const {
  setCurrentTab,
  addTab,
  removeTab,
  removeAllTab,
  removeOtherTab,
  reload,
} = tabStore
const { tabList, currentTab } = storeToRefs(tabStore)
defineOptions({ name: 'TabList' })
const isFullscreen = ref<boolean>(false)
// 全屏
const changeFullscreen = () => {
  screenFull.toggle()
}
const change = () => {
  isFullscreen.value = screenFull.isFullscreen
}
onMounted(() => {
  screenFull.on('change', change)
})
onBeforeUnmount(() => {
  screenFull.off('change', change)
})
// 切换页签时
const onTabChange = (name: string) => {
  setCurrentTab(name)
  router.push(name)
}
// 关闭当前页签
const closeCurrentTab = () => {
  removeTab(currentTab.value)
}
// 点击关闭时
const onTabRemove = (name: string) => {
  removeTab(name)
}

const createTabAndAddTab = (routeInfo: any) => {
  setCurrentTab(routeInfo.fullPath)
  const tab: ITab = {
    doNotClose: (routeInfo.meta.doNotClose as boolean) ?? false,
    path: routeInfo.fullPath,
    title: routeInfo?.meta.title as string,
  }
  addTab(tab)
}
onBeforeMount(() => {
  createTabAndAddTab(route)
})
onBeforeRouteUpdate((to) => {
  createTabAndAddTab(to)
})
</script>
<style scoped lang="scss">
.tab-container {
  height: $tablist-height;
  -webkit-user-drag: none;
  display: flex;
  align-items: center;
  .tab-container_left {
    width: calc(100% - 40px);
    height: 100%;
    .tab-container_tab {
      --el-tabs-header-height: 34px;
      :deep(.el-tabs__header) {
        margin: 0 !important;
        border: none;
      }
      :deep(.el-tabs__nav-wrap) {
        margin-bottom: 0;
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          line-height: var(--el-tabs-header-height);
        }
      }
      :deep(.el-tabs__nav) {
        border-top: none;
        border-radius: 0;
      }
      :deep(.el-tabs__item) {
        border-bottom: none;
        border-radius: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      :deep(.ghost) {
        opacity: 0.5;
        background: #c8ebfb !important;
      }
      :deep(.drag) {
        opacity: 0;
        background: #c8ebfb !important;
      }
      :deep(.flicker) {
        animation: flickerAnimation 1s infinite;
      }
      :deep(.is-icon-close) {
        width: 14px;
        visibility: hidden;
      }
      :deep(.el-tabs__item.is-active.is-closable .is-icon-close) {
        visibility: visible;
      }
      :deep(.el-tabs__item.is-closable:hover .is-icon-close) {
        visibility: visible;
      }
      :deep(.is-closable) {
        padding-left: 20px;
        padding-right: 10px;
      }
    }
  }
  .tab_dropdown {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    //background: #4e0512;
  }
}
</style>
