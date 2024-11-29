<template>
  <div
    class="switch-container--bottom"
    :style="{ width: width }"
    @click="onClick"
  >
    <el-icon class="switch-icon">
      <component :is="!collapse ? Fold : Expand"></component>
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
defineOptions({ name: 'BottomCollapse' })
withDefaults(
  defineProps<{
    width?: string
  }>(),
  {
    width: '100%',
  },
)
const collapse = defineModel({ type: Boolean, default: false })
const onClick = () => {
  collapse.value = !collapse.value
}
</script>
<style scoped lang="scss">
.switch-container--bottom {
  cursor: pointer;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  position: relative;
  .switch-icon {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
