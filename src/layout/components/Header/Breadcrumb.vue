<template>
  <div class="breadcrumb-container">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item v-for="item in route.matched" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
defineOptions({ name: 'BreadcrumbComponent' });
</script>

<style scoped lang="scss">
.breadcrumb-container {
  // TODO 后期主题切换
  background: #ffffff;
  height: 100%;
  box-sizing: border-box;
  .breadcrumb {
    height: 100%;
    line-height: $header-top-height;
    max-width: 600px;
    .el-breadcrumb__item {
      font-weight: 700;
    }
  }
}
</style>
