<template>
  <div class="not-find_container">
    <el-empty
      class="not-find"
      image-size="40%"
      :image="nodFind"
      description="404找不到此页面"
    />
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'notFoundPage',
})
import nodFind from '@/assets/images/layout/notFind.png'
</script>
<style scoped lang="scss">
.not-find_container {
  .not-find {
    :deep(.el-empty__image img) {
      border-radius: 50%;
    }
    :deep(.el-empty__description p) {
      font-size: 18px;
    }
  }
}
</style>
