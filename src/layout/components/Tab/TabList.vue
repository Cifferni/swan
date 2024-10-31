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
        <el-dropdown-menu @click="reload">
          <el-dropdown-item>
            <el-icon>
              <i class="iconfont icon-shuaxin"></i>
            </el-icon>
            重新加载
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu @click="closeCurrentTab">
          <el-dropdown-item :disabled="currentTab === '/'">
            <el-icon>
              <i class="iconfont icon-guanbidangqian"></i>
            </el-icon>
            关闭当前页签
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu>
          <el-dropdown-item divided @click="removeOtherTab">
            <el-icon>
              <i class="iconfont icon-guanbiqitabiaoqianye"></i>
            </el-icon>
            关闭其他页签
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-item :disabled="tabList.length <= 1" @click="removeAllTab">
          <el-icon>
            <i class="iconfont icon-guanbiquanbu"></i>
          </el-icon>
          关闭全部页签
        </el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { type ITab, useTabStore } from '@/store/modules/tabStore'
import { VueDraggable } from 'vue-draggable-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
const router = useRouter()
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
// const flicker = (index: number) => {
//   nextTick(() => {
//     const tab = document.querySelectorAll(
//       '#containerTab .el-tabs__nav .el-tabs__item',
//     )
//     tab[index].classList.add('flicker')
//     setTimeout(() => {
//       tab[index].classList.remove('flicker')
//     }, 2000)
//   })
// }
onBeforeRouteUpdate((to) => {
  setCurrentTab(to.fullPath)
  const tab: ITab = {
    doNotClose: (to.meta.doNotClose as boolean) ?? false,
    path: to.fullPath,
    title: to?.meta.title as string,
  }
  addTab(tab)
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
        -khtml-user-select: none;
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
