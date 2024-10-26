<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import emitter from '@/utils/emitter'
import { ref } from 'vue'
import { LanguageEnum } from '@/hook/useLanguage'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import ja from 'element-plus/dist/locale/ja.mjs'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import { onBeforeMount, onBeforeUnmount } from 'vue'
const locale = ref(zhCn)
const changeLanguage = (language: string) => {
  console.log(language)
  switch (language) {
    case LanguageEnum.en_US:
      locale.value = en
      break
    case LanguageEnum.ja_JP:
      locale.value = ja
      break
    case LanguageEnum.zh_CN:
      locale.value = zhCn
      break
    case LanguageEnum.zh_TW:
      locale.value = zhTw
      break
    default:
      locale.value = zhCn
  }
}
onBeforeMount(() => {
  emitter.on('changeLanguage', changeLanguage)
})
onBeforeUnmount(() => {
  emitter.off('changeLanguage')
})
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
}
</style>
