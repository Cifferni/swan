<template>
  <div class="breadcrumb-container">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="item in routeList"
        :to="{ path: item.path }"
        :key="item.path"
        >{{ $t(`menu.${item.meta.title}`) }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
defineOptions({ name: 'BreadcrumbComponent' })
const routeList = computed(() => route.matched.slice(1))
</script>

<style scoped lang="scss">
.breadcrumb-container {
  height: 100%;
  box-sizing: border-box;
  .breadcrumb {
    height: 100%;
    max-width: 600px;
    .el-breadcrumb__item {
      font-weight: 700;
    }
  }
}
</style>
