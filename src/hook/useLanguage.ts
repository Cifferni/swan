import { onBeforeMount, ref, watch } from 'vue'
import { DEFAULT_LANGUAGE, i18n, setLanguage } from '@/i18n'
export interface ILanguageList {
  label: string
  language: string
  id: number
}
export function useLanguage() {
  const languageList = ref<ILanguageList[]>([
    {
      label: '中文简体',
      language: 'zh-CN',
      id: 1,
    },
    {
      label: '中文繁体',
      language: 'zh-TW',
      id: 2,
    },
    {
      label: '英语',
      language: 'en-US',
      id: 3,
    },
    {
      label: '日语',
      language: 'ja-JP',
      id: 4,
    },
  ])
  const currentLanguage = ref<ILanguageList>()
  const languageInit = () => {
    const localLanguage = localStorage.getItem('language')
    if (localLanguage) {
      currentLanguage.value = languageList.value.find(
        (item) => item.language === localLanguage,
      )
    } else {
      // 默认中文
      currentLanguage.value = languageList.value.find(
        (item) => item.language === DEFAULT_LANGUAGE,
      )
      if (currentLanguage.value) {
        localStorage.setItem('language', currentLanguage.value.language)
      }
      i18n.global.locale.value = DEFAULT_LANGUAGE
    }
  }
  watch(currentLanguage, (newValue: any) => {
    setLanguage(newValue.language)
  })
  onBeforeMount(() => {
    languageInit()
  })
  return {
    languageList,
    currentLanguage,
  }
}
