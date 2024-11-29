<template>
  <div class="full_container cursor-pointer">
    <div @click="changeFullscreen">
      <i
        :class="[
          'full_icon',
          'iconfont',
          isFullscreen ? 'icon-cancel-full' : 'icon-full',
        ]"
      ></i>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'Fullscreen' })
import screenFull from 'screenfull'
import { onBeforeUnmount, onMounted, ref } from 'vue'
const isFullscreen = ref<boolean>(false)
const changeFullscreen = () => {
  screenFull.toggle()
}
const change = () => {
  isFullscreen.value = screenFull.isFullscreen
}
onMounted(() => {
  screenFull.on('change', change)
})
onBeforeUnmount(() => {
  screenFull.off('change', change)
})
</script>
<style lang="scss" scoped>
.full_icon {
  transition: all 0.3s;
}
.full_icon:hover {
  color: var(--el-color-primary);
}
</style>
