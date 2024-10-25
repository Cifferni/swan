<template>
  <template v-for="menu in menuList" :key="menu.menuId">
    <!--  没有子集  -->
    <template v-if="!menu.children">
      <el-menu-item :index="menu.path">
        <el-icon>
          <i :class="['iconfont', menu.icon]"></i>
        </el-icon>
        <span>{{ $t(`menu.${menu.name}`) }}</span>
      </el-menu-item>
    </template>
    <!--  有子集  -->
    <template v-else>
      <el-sub-menu :index="menu.path">
        <template #title>
          <el-icon>
            <i :class="['iconfont', menu.icon]"></i>
          </el-icon>
          <span>{{ $t(`menu.${menu.name}`) }}</span>
        </template>
        <MenuItem :menu-list="menu.children"> </MenuItem>
      </el-sub-menu>
    </template>
  </template>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'MenuItem',
})
defineProps<{
  menuList: any
}>()
</script>
<style lang="scss" scoped>
/* 侧栏导航菜单经典 文字超长溢出问题 CSS折行 */
.el-submenu__title {
  display: flex;
  align-items: center;
}
.el-sub-menu__title span {
  white-space: normal;
  word-break: break-all;
  line-height: 20px;
  flex: 1;
  padding-right: 20px;
}

.el-menu-item {
  display: flex;
  align-items: center;
  padding-right: 20px !important;
}
.el-menu-item span {
  white-space: normal;
  word-break: break-all;
  line-height: 20px;
  flex: 1;
}
/* 动态样式 控制收起时icon图标 */
.packUp .el-submenu__title .svg-icon {
  margin-right: 0% !important;
}
</style>
