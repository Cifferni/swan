import { onBeforeUnmount, ref } from 'vue'
import { themeStore, ThemeNameEnum } from '@/store/modules/themeStore'
import { storeToRefs } from 'pinia'
export interface IThemeOptions {
  label: string
  value: string
  img: string
}
export function useTheme() {
  const { themeColor, predefine, themeOptions, themeName, isSystemDark } =
    storeToRefs(themeStore())
  const observer = ref()
  const setColor = (
    key: string,
    value: any,
    dom = document.documentElement,
  ): void => {
    dom.style.setProperty(key, value)
  }
  //十六进制格式转 RGB 格式
  const hex2Rgb = (color: string): number[] => {
    const colors = color.replace('#', '').match(/../g) as string[]
    const result = []
    for (let i = 0; i < 3; i++) {
      result[i] = parseInt(colors[i], 16)
    }
    return result
  }
  //RGB 格式转十六进制格式
  const rgb2Hex = (r: number, g: number, b: number): string => {
    const hexs: string[] = [r.toString(16), g.toString(16), b.toString(16)]
    for (let i = 0; i < 3; i++) {
      if (hexs[i].length === 1) {
        hexs[i] = '0' + hexs[i]
      }
    }
    return '#' + hexs.join('')
  }
  //使颜色变亮
  const lighten = (color: string, level: number): string => {
    const rgb = hex2Rgb(color)
    for (let i = 0; i < 3; i++) {
      rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
    }
    return rgb2Hex(rgb[0], rgb[1], rgb[2])
  }
  //使颜色变暗
  const darken = (color: string, level: number): string => {
    const rgb = hex2Rgb(color)
    for (let i = 0; i < 3; i++) {
      rgb[i] = Math.floor(rgb[i] * (1 - level))
    }
    return rgb2Hex(rgb[0], rgb[1], rgb[2])
  }

  const applyColors = (
    prefix: string,
    color: string,
    modifier: (color: string, factor: number) => string,
  ) => {
    for (let i = 0; i < 10; i++) {
      if (i === 0) {
        setColor('--el-color-primary', color)
        setColor('--el-color-primary-dark-2', color)
        continue
      }
      setColor(`${prefix}-${i}`, modifier(color, i / 10))
    }
  }
  //
  const getSystemTheme = (): any => {
    if (isSystemDark.value) {
      return isSystemDark.value.matches
        ? ThemeNameEnum.dark
        : ThemeNameEnum.light
    }
  }
  const setThemeColor = (color: string): void => {
    // 获取当前主题
    let theme = themeName.value
    // 判断是否是自动的主题
    if (themeName.value === ThemeNameEnum.auto && isSystemDark.value) {
      // 是自动主题，获取系统主题
      theme = getSystemTheme()
    }
    // 更具不同的主题处理不同颜色值
    if (theme === ThemeNameEnum.dark) {
      applyColors(`--el-color-primary-light`, color, darken)
    } else {
      applyColors(`--el-color-primary-light`, color, lighten)
    }
  }
  const setBodyThemeProperty = (theme: string) => {
    let bodyNode: HTMLHtmlElement | null =
      document.getElementsByTagName('html')[0]
    bodyNode.className = theme
    bodyNode = null
  }
  const setThemeAndColor = (theme: string, color: string): void => {
    setBodyThemeProperty(theme)
    setThemeColor(color)
  }
  const authTheme = (): void => {
    isSystemDark.value = matchMedia('(prefers-color-scheme: dark)')
    const theme: ThemeNameEnum = isSystemDark.value.matches
      ? ThemeNameEnum.dark
      : ThemeNameEnum.light
    // 说明是暗黑模式
    setThemeAndColor(theme, themeColor.value)
    isSystemDark.value.onchange = function (event: MediaQueryListEvent) {
      setThemeAndColor(
        event.matches ? ThemeNameEnum.dark : ThemeNameEnum.light,
        themeColor.value,
      )
    }
  }
  const setThemeName = (name: string): void => {
    if (name === ThemeNameEnum.auto) {
      authTheme()
    } else {
      if (isSystemDark.value) {
        isSystemDark.value.onchange = null
        isSystemDark.value = null
      }
      setThemeAndColor(name, themeColor.value)
    }
  }
  const deleteClearBtn = () => {
    const targetNode = document.getElementById('app')
    const config = { attributes: true, childList: true, subtree: true }
    // 当节点发生变化时的需要执行的函数
    const callback = function () {
      const obj: HTMLElement | null = document.querySelector(
        '.el-color-dropdown__link-btn',
      )
      if (obj) {
        obj.style.display = 'none'
        observer.value.disconnect()
        observer.value = null
      }
    }
    // 创建一个observer示例与回调函数相关联
    observer.value = new MutationObserver(callback)
    //使用配置文件对目标节点进行观测
    observer.value.observe(targetNode, config)
  }
  onBeforeUnmount(() => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
    if (isSystemDark.value) {
      isSystemDark.value.onchange = null
      isSystemDark.value = null
    }
  })
  // 初始化主题颜色
  const initThemeColor = () => {
    setThemeName(themeName.value)
  }
  return {
    themeName,
    themeColor,
    predefine,
    themeOptions,
    setThemeColor,
    deleteClearBtn,
    initThemeColor,
    setThemeName,
  }
}
