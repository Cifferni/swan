import { onBeforeMount } from 'vue'
import { DEFAULT_LANGUAGE, setLanguage } from '@/i18n'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '@/store/modules/languageStore'

const { currentLanguage, languageList } = storeToRefs(useLanguageStore())

export function useLanguage() {
  const languageInit = () => {
    const localLanguage = localStorage.getItem('languageStore')
    if (!localLanguage) {
      currentLanguage.value = languageList.value.find(
        (item) => item.language === DEFAULT_LANGUAGE,
      )
    }
    setLanguage(currentLanguage?.value?.language ?? DEFAULT_LANGUAGE)
  }
  onBeforeMount(() => {
    languageInit()
  })
  return {
    languageList,
    currentLanguage,
  }
}
