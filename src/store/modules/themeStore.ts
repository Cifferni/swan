import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import light from '@/assets/images/theme/light.png'
import dark from '@/assets/images/theme/dark.png'
import authTheme from '@/assets/images/theme/authTheme.png'
export interface IThemeOptions {
  label: string
  value: string
  img: string
}
export const enum ThemeNameEnum {
  light = 'light',
  dark = 'dark',
  auto = 'auto',
}
export const themeStore = defineStore(
  'themeStore',
  () => {
    const DEFAULT_THEME_COLOR = ref<string>('#409EFF')
    const DEFAULT_THEME_NAME = ref<string>('light')
    const themeName = ref<string>(DEFAULT_THEME_NAME.value)
    const themeColor = ref<string>(DEFAULT_THEME_COLOR.value)
    const predefine = ref<string[]>([
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d',
    ])
    const themeOptions = ref<IThemeOptions[]>([
      {
        label: '亮色主题',
        value: ThemeNameEnum.light,
        img: light,
      },
      {
        label: '暗色主题',
        value: ThemeNameEnum.dark,
        img: dark,
      },
      {
        label: '跟随系统',
        value: ThemeNameEnum.auto,
        img: authTheme,
      },
    ])
    const isSystemDark = ref<MediaQueryList | null>(null)
    return {
      themeColor,
      predefine,
      themeOptions,
      themeName,
      isSystemDark,
      DEFAULT_THEME_COLOR: readonly(DEFAULT_THEME_COLOR),
      DEFAULT_THEME_NAME: readonly(DEFAULT_THEME_NAME),
    }
  },
  { persist: true },
)
