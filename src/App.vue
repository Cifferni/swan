<template>
  <router-view v-show="!isLading"></router-view>
  <systemLoading v-show="isLading"></systemLoading>
</template>
<script setup lang="ts">
import systemLoading from '@/layout/components/systemLoading.vue'
import { ref } from 'vue'
const isLading = ref<boolean>(false)
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
}
</style>
