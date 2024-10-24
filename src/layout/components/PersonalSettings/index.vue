<template>
  <div class="settingsDrawer-container">
    <el-drawer class="settingsDrawer" v-model="settingsDrawer" title="个人设置">
      <div class="pl-2 pr-2">
        <LabelContainer title="语言">
          <el-select
            v-model="currentLanguage"
            value-key="id"
            placeholder="Select"
          >
            <el-option
              v-for="(item, index) in languageList"
              :key="index"
              :label="item.label"
              :value="item"
            /> </el-select
        ></LabelContainer>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import LabelContainer from '@/components/LabelContainer/index.vue'
import { ref } from 'vue'
import { useLanguage } from '@/hook/useLanguage'
import emitter from '@/utils/emitter'
defineOptions({ name: 'PersonalSettings' })
const { languageList, currentLanguage } = useLanguage()
const settingsDrawer = ref<boolean>(false)

emitter.on('settingsDrawer', (value: boolean): void => {
  settingsDrawer.value = value
})
</script>

<style scoped lang="scss">
.settingsDrawer-container {
  :deep(.settingsDrawer) {
    width: 60% !important;
    max-width: 300px;
    .el-drawer__header {
      margin: 0;
      padding: 20px 10px;
      border-bottom: 1px solid #e6e6e6;
      .el-drawer__title {
        font-size: 16px;
        color: #000000;
        font-weight: 600;
      }
    }
    .el-drawer__body {
      padding: 0;
    }
  }
}
</style>
