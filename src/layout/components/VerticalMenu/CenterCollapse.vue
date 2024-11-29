<template>
  <div class="switch-container--center" @click="setCollapse">
    <el-icon class="switch-icon">
      <component :is="!menuCollapse ? Fold : Expand"></component>
    </el-icon>
  </div>
  <teleport to="body"></teleport>
</template>
<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import useVerticalMenu from '@/hook/useVerticalMenu'
defineOptions({ name: 'CenterCollapse' })
const { menuCollapse } = useVerticalMenu()
const setCollapse = () => {
  menuCollapse.value = !menuCollapse.value
}
</script>
<style scoped lang="scss">
.switch-container--center {
  background: var(--el-bg-color);
  width: 26px;
  height: 26px;
  border-radius: 13px;
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: var(--el-box-shadow-lighter);
  z-index: 2;
  cursor: pointer;
  .switch-icon {
    font-size: 13px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
