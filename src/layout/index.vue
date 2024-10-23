<template>
  <div class="common-layout">
    <el-container>
      <div class="left-container">
        <Menu v-if="isMobileVersion"></Menu>
        <el-drawer v-else v-model="drawer" direction="ltr" :with-header="false">
          <Menu></Menu>
        </el-drawer>
      </div>
      <el-container>
        <el-header>
          <div class="header-top flex items-center">
            <CollapseSwitch
              v-if="!isMobileVersion"
              width="40px"
              :collapse="drawer"
              @set-collapse="drawer = !drawer"
            ></CollapseSwitch>
            <Breadcrumb></Breadcrumb>
          </div>
          <TabList></TabList>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition mode="out-in">
              <keep-alive :max="10" :exclude="tabStore.exclude">
                <component
                  :is="Component"
                  v-if="tabStore.showComponent"
                  :key="Component.key"
                />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Menu from '@/layout/components/VerticalMenu/index.vue'
import TabList from '@/layout/components/Header/TabList.vue'
import Breadcrumb from '@/layout/components/Header/Breadcrumb.vue'
import CollapseSwitch from '@/layout/components/VerticalMenu/CollapseSwitch.vue'
import { useTabStore } from '@/store/modules/tabStore'
import { debounce } from 'lodash-es'
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
const tabStore = useTabStore()
defineOptions({
  name: 'layoutPage',
})
// 元素监视器
const resizeObserver = ref<ResizeObserver>()
const drawer = ref<boolean>(false)

const isMobileVersion = ref<boolean>(true)
const setAdaptive = () => {
  resizeObserver.value = new ResizeObserver(
    debounce((entries: any) => {
      const { width } = entries[0].contentRect
      // sm < 768
      if (width > 0 && width < 768) {
        // isShowCollapse.value = true;
        isMobileVersion.value = false
      } else if (width >= 768 && width < 1024) {
        isMobileVersion.value = true
        // isShowCollapse.value = false;
      } else if (width >= 1024 && width < 1280) {
        isMobileVersion.value = true
        // isShowCollapse.value = false;
      } else {
        isMobileVersion.value = true
        // isShowCollapse.value = false;
      }
    }, 100),
  )
  const body = document.querySelector('body')
  resizeObserver.value.observe(body as Element, {})
  console.log(resizeObserver.value)
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
  //background: #f0f2f5;
  .left-container {
    border-right: 1px solid #e6e6e6;
  }
  .el-header {
    background: #ffff;
    height: auto;
    box-sizing: border-box;
    padding: 0;
    box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.1);

    .header-top {
      padding-left: 10px;
      height: $header-top-height;
      box-sizing: border-box;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .el-aside {
    background: #ffffff;
    height: 100vh;
    width: auto;
    transition: all 1s;
  }
  .el-main {
    height: calc(100vh - $header-height);
  }
}
</style>
