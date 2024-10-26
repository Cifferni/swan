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
        <LabelContainer :title="$t('theme.title')">
          <el-segmented
            v-model="themeName"
            class="mb-2"
            :options="themeOptions"
            @change="setThemeName"
          >
            <template #default="{ item }">
              <div class="flex justify-center items-center">
                <img :src="item.img" :alt="item.label" class="w-1/5 mr-1/2" />
                <div>{{ item.label }}</div>
              </div>
            </template>
          </el-segmented>
          <el-color-picker
            class="themeColorsPicker"
            v-model="themeColor"
            :predefine="predefine"
            @change="colorChange"
          />
        </LabelContainer>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import LabelContainer from '@/components/LabelContainer/index.vue'
import { useLanguage } from '@/hook/useLanguage'
import { setLanguage } from '@/i18n'
import { useTheme } from '@/hook/useTheme'
defineOptions({ name: 'PersonalSettings' })
const {
  themeColor,
  predefine,
  themeOptions,
  themeName,
  deleteClearBtn,
  initThemeColor,
  setThemeColor,
  setThemeName,
} = useTheme()

const { languageList, currentLanguage } = useLanguage()
const onChange = (value: any) => {
  setLanguage(value.language)
}

const showSettingsDrawer = defineModel()
const colorChange = (color: string) => {
  setThemeColor(color)
}
onMounted(() => {
  //  清除主题颜色选择器的清除按钮
  deleteClearBtn()
  //  初始化主题颜色
  initThemeColor()
})
</script>

<style scoped lang="scss">
.settingsDrawer-container {
  :deep(.settingsDrawer) {
    width: 100% !important;
    max-width: 300px;
    .el-drawer__header {
      margin: 0;
      padding: 20px 10px;
      border-bottom: 1px solid var(--el-border-color-lighter);
      .el-drawer__title {
        font-size: 16px;
        font-weight: 600;
      }
    }
    .el-drawer__body {
      padding: 0;
    }
    // 主题选择器
    .el-segmented__item {
      padding: 0;
    }
    // 主题颜色选择器
    .themeColorsPicker {
      .el-color-picker__trigger {
        width: 100%;
        height: 40px;
      }
    }
  }

  .el-color-dropdown__link-btn {
    display: none;
  }
}
</style>
