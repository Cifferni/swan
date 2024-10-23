<template>
  <div class="menu-page" ref="menuPage">
    <Logo :collapse></Logo>
    <CenterCollapse v-if="isShowCollapse"></CenterCollapse>
    <el-scrollbar view-class="enum-scrollbar" wrap-class="enum-scrollbar">
      <el-menu
        class="menu"
        :collapse="collapse"
        :unique-opened="true"
        :default-active="defaultActive"
        @select="onSelect"
      >
        <MenuItem :menu-list="menuList ?? []"></MenuItem>
      </el-menu>
    </el-scrollbar>
    <CollapseSwitch
      v-if="isShowCollapse"
      :collapse="collapse"
      @set-collapse="setCollapse"
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
import MenuItem from '@/layout/components/VerticalMenu/menuItem.vue'
const { collapse, menuList, route, router, isShowCollapse, setCollapse } =
  useVerticalMenu()
const defaultActive = ref<string>()
// 选择时
const onSelect = (index: string) => {
  router.push({ path: index })
}
watchEffect(() => {
  defaultActive.value = route.path
})
// watch(route, (newVal) => {
//
// });
</script>
<style scoped lang="scss">
.menu-page {
  // TODO 后期主题切换
  background: #ffff;
  height: 100%;
  position: relative;
  .el-scrollbar {
    height: calc(100vh - $header-top-height - $bottom-control-height);
    .menu {
      width: $menu-collapse-width;
      height: 100%;
      border: none;
    }
    .el-menu:not(.el-menu--collapse) {
      width: $menu-expand-width;
    }
    .el-menu--collapse .el-submenu__title span {
      display: none;
    }
    .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }
  }
}
</style>
