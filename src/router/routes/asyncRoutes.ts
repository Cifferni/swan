export const asyncRoutes = [
  // 首页
  {
    path: '/',
    name: 'dashboardPage',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      title: 'home', // 用于显示tab的标题
      icon: 'icon-shouye', // 用于显示tab图标
      doNotClose: true, // 禁止tab页签关闭
    },
  },
  // 基础设置
  {
    path: '/basicSettings',
    name: 'basicSettingsPage',
    redirect: '/basicSettings/roleManagement',
    meta: {
      title: 'basicSettings',
      icon: 'icon-jichushezhi_jichushezhi',
    },
    children: [
      {
        path: 'roleManagement',
        name: 'roleManagementPage',
        component: () => import('@/pages/basicSettings/roleManagement.vue'),
        meta: {
          title: 'roleManagement',
          icon: 'icon-jiaoseguanli',
        },
      },
      {
        path: 'userManagement',
        name: '"userManagementPage"',
        component: () => import('@/pages/basicSettings/userManagement.vue'),
        meta: {
          title: 'userManagement',
          icon: 'icon-yonghuguanli',
        },
      },
    ],
  },
  // 采购管理
  {
    path: '/purchaseManagement',
    name: 'purchaseManagement',
    redirect: '/purchaseManagement/purchaseInbound',
    meta: {
      title: 'purchaseManagement',
      icon: 'icon-caigouguanli',
    },
    children: [
      {
        path: 'purchaseInbound',
        name: 'purchaseInboundPage',
        component: () =>
          import('@/pages/purchaseManagement/purchaseInbound.vue'),
        meta: {
          title: 'purchaseInbound',
          icon: 'icon-caigouruku',
        },
      },
      {
        path: 'purchaseOrder',
        name: 'purchaseOrderPage',
        component: () => import('@/pages/purchaseManagement/purchaseOrder.vue'),
        meta: {
          title: 'purchaseOrder',
          icon: 'icon-caigoudingdan',
        },
      },
    ],
  },
]
export const notFoundPage = {
  path: '/:pathMatch(.*)*',
  name: 'notFoundPage',
  component: () => import('@/layout/notFound.vue'),
}
export const unauthorizedVariable = {
  path: '/403',
  name: '403',
  component: () => import('@/layout/403Page.vue'),
}
