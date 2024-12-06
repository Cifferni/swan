<template>
  <div class="header-top flex items-center justify-between">
    <div class="left-container">
      <CollapseSwitch
        v-if="showMenuDrawer"
        v-model="menuDrawer"
        width="40px"
      ></CollapseSwitch>
      <Breadcrumb v-if="showBreadcrumb"></Breadcrumb>
    </div>
    <div class="right-container">
      <!--   全屏开关   -->
      <FullScreen></FullScreen>
      <!--      头像-->
      <div
        class="avatar_container cursor-pointer"
        @click="showPersonalSet = true"
      >
        <el-avatar
          class="avatar"
          :size="22"
          :src="authStore.userInfo?.Avatar"
          alt="用户头像"
        />
        <el-icon class="menuDrawer_icon"><Fold /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from '@/layout/components/Header/Breadcrumb.vue'
import CollapseSwitch from '@/layout/components/VerticalMenu/CollapseSwitch.vue'
import FullScreen from '@/layout/components/FullScreen/index.vue'
import { Fold } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/modules/authStore'
import { useLayoutStore } from '@/store/modules/layoutStore'
const layoutStore = useLayoutStore()
const { showBreadcrumb, showMenuDrawer, showPersonalSet, menuDrawer } =
  storeToRefs(layoutStore)
const authStore = useAuthStore()
defineOptions({ name: 'HeaderTop' })
</script>
<style scoped lang="scss">
.header-top {
  border-left: 1px solid var(--el-border-color-lighter);
  height: $header-top-height;
  box-sizing: border-box;
  border-bottom: 1px solid var(--el-border-color-lighter);
  .left-container {
    padding-left: 10px;
  }
  .right-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    .avatar_container {
      width: 40px;
      height: 100%;
      position: relative;
      &:hover {
        .avatar {
          z-index: 1;
          opacity: 0;
        }
        .menuDrawer_icon {
          z-index: 2;
          opacity: 1;
        }
      }
      .avatar {
        transition: opacity 0.2s;
        z-index: 2;
        opacity: 1;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      .menuDrawer_icon {
        transition: opacity 1s;
        z-index: 1;
        opacity: 0;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
