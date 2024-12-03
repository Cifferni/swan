<template>
  <div class="settingsDrawer-container">
    <el-drawer
      class="settingsDrawer"
      v-model="showSettingsDrawer"
      :title="$t('personalSettings.title')"
    >
      <el-scrollbar>
        <div class="pl-2 pr-2 pb-[56px]">
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
                  <div>{{ $t(`theme.${item.value}`) }}</div>
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
          <LabelContainer :title="$t('personalSettings.clearLocalCache')">
            <el-button type="primary" @click="clearLocalCache">{{
              $t('personalSettings.clear')
            }}</el-button>
          </LabelContainer>
        </div>
      </el-scrollbar>
      <!--  退出登录   -->
      <LabelContainer
        class="absolute left-0 bottom-0 w-full pl-2 pr-2 z-10 mb-0 pt-3 pb-3"
        style="border-top: 1px solid var(--el-border-color-lighter)"
      >
        <el-button type="primary" @click="logOut">{{
          $t('personalSettings.logOut')
        }}</el-button>
      </LabelContainer>
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
import { useAuthStore } from '@/store/modules/authStore'
import { useI18n } from 'vue-i18n'
defineOptions({ name: 'PersonalSettings' })
const { t } = useI18n()
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
const { clearUserInfo } = useAuthStore()
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
    title: t('personalSettings.tipTitle'),
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
        t('personalSettings.clearWarningMessage'),
      ),
    ]),
    showCancelButton: true,
    confirmButtonText: t('personalSettings.confirmButtonText'),
    cancelButtonText: t('personalSettings.cancelButtonText'),
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: t('personalSettings.cleanUpSuccess'),
      })
      localStorage.removeItem('languageStore')
      localStorage.removeItem('themeStore')
      localStorage.removeItem('tabStore')
      router.go(0)
    })
    .catch(() => {})
}
const logOut = () => {
  clearUserInfo()
  router.push('/login')
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
  .logout-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: 0;
    padding-bottom: 10px;
    background: var(--el-bg-color);
    z-index: 1;
  }
}
</style>
