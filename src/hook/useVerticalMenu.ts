import { useAuthStore } from '@/store/modules/authStore'
import { useLayoutStore } from '@/store/modules/layoutStore'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
export default function useVerticalMenu() {
  const router = useRouter()
  const route = useRoute()
  const { userInfo } = storeToRefs(useAuthStore())
  const {
    menuDrawer,
    showMenuDrawer,
    menuCollapse,
    showBreadcrumb,
    showMenuCollapseBtn,
    showPersonalSet,
  } = storeToRefs(useLayoutStore())
  return {
    menuList: userInfo.value.menu ?? [],
    router,
    route,
    menuDrawer,
    showMenuDrawer,
    menuCollapse,
    showBreadcrumb,
    showMenuCollapseBtn,
    showPersonalSet,
  }
}
