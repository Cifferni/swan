<template>
  <div class="dashboard">
    <div>小组件</div>
    <div>{{ num }}</div>
    <el-button @click="dialogVisible = true">add</el-button>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="500"
      :modal="false"
      draggable
      :close-on-click-modal="false"
    >
      <span>It's a draggable Dialog</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isSHow = true">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isSHow"
      title="Tips"
      width="500"
      :modal="false"
      draggable
      :close-on-click-modal="false"
    >
      <span>It's a draggable Dialog</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'dashboardPage',
})
const num = ref(0)
const dialogVisible = ref(false)
const isSHow = ref(false)
</script>
<style scoped lang="scss">
.dashboard {
  height: 100%;
}
</style>
