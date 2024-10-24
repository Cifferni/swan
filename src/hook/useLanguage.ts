import { onBeforeMount, ref, watch } from 'vue'

export interface ILanguageList {
  label: string
  value: string
  id: number
}
export function useLanguage() {
  const languageList = ref<ILanguageList[]>([
    {
      label: '中文简体',
      value: 'zh-CN',
      id: 1,
    },
    {
      label: '中文繁体',
      value: 'ja-JP',
      id: 2,
    },
    {
      label: '英语',
      value: 'en-US',
      id: 3,
    },
    {
      label: '日语',
      value: 'ja-JP',
      id: 4,
    },
  ])
  const currentLanguage = ref<ILanguageList>()
  const languageInit = () => {
    const localLanguage = localStorage.getItem('language')
    if (localLanguage) {
      currentLanguage.value = JSON.parse(localLanguage)
    } else {
      currentLanguage.value = languageList.value.find(
        (item) => item.value === 'zh-CN',
      )
    }
  }
  watch(
    currentLanguage,
    (newValue) => {
      console.log(newValue)
    },
    { immediate: true },
  )
  onBeforeMount(() => {
    languageInit()
  })
  return {
    languageList,
    currentLanguage,
  }
}
