import { defineStore } from 'pinia';
import { ref } from 'vue';
export interface IVerticalMenuItem {
  name: string;
  path: string;
  icon: string;
  menuId: number;
  children?: IVerticalMenuItem[];
}
export const useVerticalMenuStore = defineStore('verticalMenu', () => {
  // 菜单是否展开
  const collapse = ref(false);
  // 菜单列表
  const menuList = ref<IVerticalMenuItem>();
  // 是否显示底部折起按钮
  const isShowCollapse = ref<boolean>(true);
  // 设置展开收起
  const setCollapse = (value: boolean = true) => {
    collapse.value = value;
  };
  return {
    collapse,
    isShowCollapse,
    setCollapse,
    menuList
  };
});
