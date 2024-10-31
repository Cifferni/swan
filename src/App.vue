<template>
  <el-config-provider :locale="languageStore.elementPlusLang">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useTheme } from '@/hook/useTheme'
import { useLanguageStore } from '@/store/modules/languageStore'

const { initThemeColor } = useTheme()
const languageStore = useLanguageStore()
onBeforeMount(() => {
  initThemeColor()
})
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
}
#nprogress .bar {
  background: var(--el-color-primary) !important;
}
</style>
