<template>
  <div class="switch-container--center" @click="setCollapse(!collapse)">
    <el-icon v-if="collapse" class="switch-icon"> <Expand /> </el-icon>
    <el-icon v-else class="switch-icon"><Fold /></el-icon>
  </div>
</template>
<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import useVerticalMenu from '@/hook/useVerticalMenu'
defineOptions({ name: 'CenterCollapse' })
const { collapse, setCollapse } = useVerticalMenu()
</script>
<style scoped lang="scss">
.switch-container--center {
  width: 26px;
  height: 26px;
  border-radius: 13px;
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid transparent;
  background: #ffffff;
  box-shadow: 0 0 7px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
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
