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
const emits = defineEmits(['setCollapse'])
const collapse = defineModel()
const onClick = () => {
  emits('setCollapse', !collapse.value)
  collapse.value = !collapse.value
}
</script>
<style scoped lang="scss">
.switch-container--bottom {
  width: 100%;
  height: 40px;
  // TODO 后期切换主题
  background: #ffffff;
  border-top: 1px solid #f0f2f5;
  box-sizing: border-box;
  position: relative;
  .switch-icon {
    font-size: 17px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
