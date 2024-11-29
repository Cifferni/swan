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
        <!--  主题      -->
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
        <!--  清理本地缓存      -->
        <LabelContainer title="清理本地缓存">
          <el-button type="primary" @click="clearLocalCache">清理</el-button>
        </LabelContainer>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import LabelContainer from '@/components/LabelContainer/index.vue'
import { useLanguage } from '@/hook/useLanguage'
import { setLanguage } from '@/i18n'
import { useTheme } from '@/hook/useTheme'
import { useRouter } from 'vue-router'
defineOptions({ name: 'PersonalSettings' })
const router = useRouter()
const {
  themeColor,
  predefine,
  themeOptions,
  themeName,
  deleteClearBtn,
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
const clearLocalCache = () => {
  ElMessageBox({
    title: '提示',
    message: h('p', null, [
      h(
        'i',
        {
          class: 'iconfont icon-WarningFilled',
          style: 'color:#FBB310;font-size:25px;vertical-align:text-bottom;',
        },
        '',
      ),
      h(
        'span',
        { style: 'font-size: 15px;margin-left:6px' },
        '清理本地缓存后将会自动刷新是否确定？',
      ),
    ]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '清理成功',
      })
      localStorage.removeItem('languageStore')
      localStorage.removeItem('themeStore')
      localStorage.removeItem('tabStore')
      router.go(0)
    })
    .catch(() => {})
}
onMounted(() => {
  //  清除主题颜色选择器的清除按钮
  deleteClearBtn()
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
