export const asyncRoutes = [
  // 首页
  {
    path: '/',
    name: 'dashboardPage',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      title: '首页', // 用于显示tab的标题
      icon: 'icon-shouye', // 用于显示tab图标
      doNotClose: true // 禁止tab页签关闭
    }
  },
  // 基础设置
  {
    path: '/basicSettings',
    name: 'basicSettingsPage',
    redirect: '/basicSettings/roleManagement',
    meta: {
      title: '基础设置',
      icon: 'icon-jichushezhi_jichushezhi'
    },
    children: [
      {
        path: 'roleManagement',
        name: 'roleManagementPage',
        component: () => import('@/pages/basicSettings/roleManagement.vue'),
        meta: {
          title: '角色管理',
          icon: 'icon-jiaoseguanli'
        }
      },
      {
        path: 'userManagement',
        name: '"userManagementPage"',
        component: () => import('@/pages/basicSettings/userManagement.vue'),
        meta: {
          title: '用户管理',
          icon: 'icon-yonghuguanli'
        }
      }
    ]
  },
  // 采购管理
  {
    path: '/purchaseManagement',
    name: 'purchaseManagementPage',
    redirect: '/purchaseManagement/purchaseInBound',
    meta: {
      title: '采购管理',
      icon: 'icon-basicSettings'
    },
    children: [
      {
        path: 'purchaseInBound',
        name: 'purchaseInBoundPage',
        component: () => import('@/pages/purchaseManagement/purchaseInBound.vue'),
        meta: {
          title: '采购入库',
          icon: 'icon-caigouruku'
        }
      },
      {
        path: 'purchaseOrder',
        name: 'purchaseOrderPage',
        component: () => import('@/pages/purchaseManagement/purchaseOrder.vue'),
        meta: {
          title: '采购订单',
          icon: 'icon-caigoudingdan'
        }
      }
    ]
  }
];
export const notFoundPage = {
  path: '/:pathMatch(.*)*',
  name: 'notFoundPage',
  component: () => import('@/layout/notFound.vue')
};
export const unauthorizedVariable = { path: '/403', name: '403', component: () => import('@/layout/403Page.vue') };
