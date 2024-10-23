import { useVerticalMenuStore } from '@/store/modules/verticalMenuStore';
import { useAuthStore } from '@/store/modules/authStore';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
export default function useVerticalMenu() {
  const router = useRouter();
  const route = useRoute();
  const verticalMenuStore = useVerticalMenuStore();
  const { userInfo } = storeToRefs(useAuthStore());
  const { setCollapse } = verticalMenuStore;
  const { collapse, isShowCollapse } = storeToRefs(verticalMenuStore);
  return {
    menuList: userInfo.value.menu ?? [],
    setCollapse,
    collapse,
    router,
    route,
    isShowCollapse
  };
}
