<template>
  <div class="header-top flex items-center justify-between">
    <div class="left-container">
      <CollapseSwitch
        v-if="mobileMode"
        width="40px"
        @set-collapse="menuDrawer = true"
      ></CollapseSwitch>
      <Breadcrumb v-show="!mobileMode"></Breadcrumb>
    </div>
    <div class="right-container h-full overflow-hidden">
      <div
        class="avatar-container h-full flex items-center cursor-pointer text-sm w-24 justify-center transition ease-in-out hover:scale-110 duration-300"
        @click="onClick"
      >
        <el-avatar size="small" :src="authStore.userInfo.Avatar" />
        <div class="ml-1">{{ authStore.userInfo.useName }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from '@/layout/components/Header/Breadcrumb.vue'
import CollapseSwitch from '@/layout/components/VerticalMenu/CollapseSwitch.vue'
import { useAuthStore } from '@/store/modules/authStore'
const authStore = useAuthStore()
import emitter from '@/utils/emitter'
defineOptions({ name: 'HeaderTop' })
defineProps({
  mobileMode: {
    type: Boolean,
    default: false,
  },
})
const menuDrawer = defineModel('menuDrawer')
const onClick = () => {
  emitter.emit('settingsDrawer', true)
}
</script>
<style scoped lang="scss">
.header-top {
  padding: 0 0 0 10px;
  height: $header-top-height;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
}
</style>
