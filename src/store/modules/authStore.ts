import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginServe, getUserInfoServe } from '@/api/modules/auth';
import { createRouters } from '@/utils/auth';
import router from '@/router';
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('');
  const userInfo = ref<any>({});
  // 登录
  const login = async <T>(LoginParams: T): Promise<any> => {
    const res: any = await loginServe(LoginParams);
    if (res.code === '200') {
      token.value = res.data.token;
      window.localStorage.setItem('token', JSON.stringify(res.data.token));
      return res;
    }
    return Promise.reject(res);
  };
  // 获取用户信息
  const getUserInfo = async (token: string): Promise<any> => {
    const result: any = await getUserInfoServe(token);
    if (result.code === '200') {
      userInfo.value = result.data;
      createRouters(result.data.menu);
      return result;
    }
    return Promise.reject(result);
  };
  // 清除用户信息
  const clearUserInfo = () => {
    token.value = '';
    userInfo.value = null;
    window.localStorage.removeItem('token');
  };
  return { token, login, getUserInfo, userInfo, clearUserInfo };
});
