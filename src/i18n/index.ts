import { createI18n } from 'vue-i18n'

export const DEFAULT_LANGUAGE = 'zh-CN'
export function loadLang() {
  const modules: Record<string, any> = import.meta.glob('./lang/*.ts', {
    eager: true,
  })
  const langObj: Record<string, any> = {}

  for (const path in modules) {
    const name = path.replace(/(\.\/lang\/|\.ts)/g, '').trim()
    langObj[name] = modules[path].default
  }
  return langObj
}
export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || DEFAULT_LANGUAGE,
  fallbackLocale: DEFAULT_LANGUAGE,
  messages: loadLang(),
})

export function setLanguage(locale: string) {
  if (locale) {
    localStorage.setItem('language', locale)
    i18n.global.locale.value = locale
  }
}
