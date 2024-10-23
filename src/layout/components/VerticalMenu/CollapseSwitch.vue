<template>
  <div
    class="switch-container--bottom"
    :style="{ width: width }"
    @click="onClick"
  >
    <el-icon v-if="collapse" class="switch-icon"> <Expand /> </el-icon>
    <el-icon v-else class="switch-icon"><Fold /></el-icon>
  </div>
</template>
<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
defineOptions({ name: 'BottomCollapse' })
const props = withDefaults(
  defineProps<{
    width?: string
    collapse: boolean
  }>(),
  {
    width: '100%',
  },
)
// const collapse = defineModel('collapse');
const emits = defineEmits(['setCollapse'])
const onClick = () => {
  emits('setCollapse', !props.collapse)
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
