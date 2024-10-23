import { useAuthStore } from '@/store/modules/authStore';
import { storeToRefs } from 'pinia';
export default function useAuth() {
  const { token, userInfo } = storeToRefs(useAuthStore());
  const { login, getUserInfo, clearUserInfo } = useAuthStore();
  return { token, login, getUserInfo, userInfo, clearUserInfo };
}
