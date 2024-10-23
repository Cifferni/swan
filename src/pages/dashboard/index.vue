<template>
  <div class="dashboard">
    <div>小组件</div>
    <div>{{ num }}</div>
    <el-button @click="num++">add</el-button>
    <!--    <h1 class="text-3xl font-bold underline">Hello world!</h1>-->
    <!--    <el-button type="success">成功</el-button>-->
  </div>
</template>
<script setup lang="ts">
import { onActivated, onMounted, ref } from 'vue';
defineOptions({
  name: 'dashboardPage'
});
onMounted(() => {
  console.log('onBeforeMount');
});
onActivated(() => {
  console.log('onActivated');
});
const num = ref(0);
</script>
<style scoped lang="scss">
.dashboard {
  height: 100%;
  background: #ffffff;
}
</style>
