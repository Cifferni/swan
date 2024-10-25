<template>
  <div class="settingsDrawer-container">
    <el-drawer
      class="settingsDrawer"
      v-model="showSettingsDrawer"
      :title="$t('personalSettings.title')"
    >
      <div class="pl-2 pr-2">
        <!--   多语     -->
        <LabelContainer :title="$t('setLang.lang')">
          <el-select
            v-model="currentLanguage"
            value-key="id"
            placeholder="Select"
            @change="onChange"
          >
            <el-option
              v-for="(item, index) in languageList"
              :key="index"
              :label="$t(`setLang.${item.language}`)"
              :value="item"
            /> </el-select
        ></LabelContainer>
        <LabelContainer :title="$t('theme.title')"> </LabelContainer>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import LabelContainer from '@/components/LabelContainer/index.vue'
import { useLanguage } from '@/hook/useLanguage'
import { setLanguage } from '@/i18n'
defineOptions({ name: 'PersonalSettings' })
const { languageList, currentLanguage } = useLanguage()

const onChange = (value: any) => {
  setLanguage(value.language)
}
const showSettingsDrawer = defineModel()
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
