<template>
  <router-link to="/" class="logo">
    <img class="logo_img" :src="logoImg" alt="企业logo" />
    <span v-show="!collapse" class="logo-title_span flex-1 truncate">swan</span>
  </router-link>
</template>
<script setup lang="ts">
defineOptions({ name: 'LogoComponents' })
defineProps<{
  collapse: boolean
}>()
const logoImg = new URL('/src/assets/images/layout/logo.png', import.meta.url)
  .href
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $header-top-height;
  display: flex;
  justify-content: start;
  align-items: center;
  .logo_img {
    margin-left: 10px;
    height: $header-top-height;
  }
  .logo-title_span {
    margin-left: 10px;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
