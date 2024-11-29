<template>
  <div class="menu-page" ref="menuPage">
    <Logo :collapse="menuCollapse"></Logo>
    <CenterCollapse v-if="showMenuCollapseBtn"></CenterCollapse>
    <el-scrollbar view-class="enum-scrollbar" wrap-class="enum-scrollbar">
      <el-menu
        class="menu"
        :collapse="menuCollapse"
        :unique-opened="true"
        :default-active="defaultActive"
        :collapse-transition="false"
        @select="onSelect"
      >
        <MenuItem :menu-list="menuList ?? []"></MenuItem>
      </el-menu>
    </el-scrollbar>
    <CollapseSwitch
      v-if="showMenuCollapseBtn"
      v-model="menuCollapse"
    ></CollapseSwitch>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
defineOptions({ name: 'VerticalMenu' })
import Logo from '@/layout/components/VerticalMenu/Logo.vue'
import CenterCollapse from '@/layout/components/VerticalMenu/CenterCollapse.vue'
import CollapseSwitch from '@/layout/components/VerticalMenu/CollapseSwitch.vue'
import useVerticalMenu from '@/hook/useVerticalMenu'
import MenuItem from '@/layout/components/VerticalMenu/MenuItem.vue'
const { menuList, router, route, menuCollapse, showMenuCollapseBtn } =
  useVerticalMenu()
const defaultActive = ref<string>()
// 选择时
const onSelect = (index: string) => {
  router.push({ path: index })
}
watchEffect(() => {
  defaultActive.value = route.path
})
</script>
<style scoped lang="scss">
.menu-page {
  height: 100%;
  position: relative;

  .el-scrollbar {
    height: calc(100vh - $header-top-height - $bottom-control-height);
    .menu {
      height: 100%;
      border: none;
    }
    .el-menu--collapse .el-submenu__title span {
      display: none;
    }
    .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }
  }
  :deep(.switch-container--bottom) {
    border-top: 1px solid var(--el-border-color-lighter);
  }
}
</style>
