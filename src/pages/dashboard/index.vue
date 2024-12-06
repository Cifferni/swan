<template>
  <div class="dashboard">
    <div>小组件</div>
    <div>{{ num }}</div>
    <el-button @click="num++">add</el-button>
    <!--    <WindowPopUp></WindowPopUp>-->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// import WindowPopUp from '@/components/WindowPopUp/index.vue'
defineOptions({
  name: 'dashboardPage',
})
const num = ref(0)
</script>
<style scoped lang="scss">
.dashboard {
  height: 100%;
}
</style>
