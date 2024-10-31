import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import ja from 'element-plus/dist/locale/ja.mjs'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
// import { DEFAULT_LANGUAGE, i18n, setLanguage } from '@/i18n'
export interface ILanguageList {
  label: string
  language: LanguageEnum
  id: number
}
export enum LanguageEnum {
  zh_CN = 'zh-CN',
  zh_TW = 'zh-TW',
  en_US = 'en-US',
  ja_JP = 'ja-JP',
}
export const useLanguageStore = defineStore(
  'languageStore',
  () => {
    // 当前语种
    const currentLanguage = ref<ILanguageList>()
    // 语种列表
    const languageList = ref<ILanguageList[]>([
      {
        label: '中文简体',
        language: LanguageEnum.zh_CN,
        id: 1,
      },
      {
        label: '中文繁体',
        language: LanguageEnum.zh_TW,
        id: 2,
      },
      {
        label: '英语',
        language: LanguageEnum.en_US,
        id: 3,
      },
      {
        label: '日语',
        language: LanguageEnum.ja_JP,
        id: 4,
      },
    ])
    // element-plus 语言包
    const elementPlusLang = computed(() => {
      switch (currentLanguage.value?.language) {
        case LanguageEnum.en_US:
          return en
        case LanguageEnum.ja_JP:
          return ja
        case LanguageEnum.zh_CN:
          return zhCn
        case LanguageEnum.zh_TW:
          return zhTw
        default:
          return zhCn
      }
    })
    return {
      currentLanguage,
      languageList,
      elementPlusLang,
    }
  },
  { persist: true },
)
