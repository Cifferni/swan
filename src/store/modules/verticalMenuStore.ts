import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface IVerticalMenuItem {
  name: string
  path: string
  icon: string
  menuId: number
  children?: IVerticalMenuItem[]
}
export const useVerticalMenuStore = defineStore('verticalMenu', () => {
  // 菜单列表
  const menuList = ref<IVerticalMenuItem>()
  return {
    menuList,
  }
})
