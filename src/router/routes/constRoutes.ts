import type { RouteRecordRaw } from 'vue-router'
export const constRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layoutPage',
    component: () => import('@/layout/index.vue'),
    // 动态路由位置
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layout/notFound.vue'),
  },
]
