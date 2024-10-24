<template>
  <template v-for="menu in menuList" :key="menu.menuId">
    <!--  没有子集  -->
    <template v-if="!menu.children">
      <el-menu-item :index="menu.path">
        <el-icon>
          <i :class="['iconfont', menu.icon]"></i>
        </el-icon>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </template>
    <!--  有子集  -->
    <template v-else>
      <el-sub-menu :index="menu.path">
        <template #title>
          <el-icon>
            <i :class="['iconfont', menu.icon]"></i>
          </el-icon>
          <span>{{ menu.name }}</span>
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
<style lang="scss" scoped></style>
