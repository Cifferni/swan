export const menu = [
  {
    name: '首页',
    path: '/',
    icon: 'icon-shouye',
    menuId: '1'
  },
  {
    name: '采购管理',
    icon: 'icon-caigouguanli',
    menuId: '3',
    path: '/purchaseManagement',
    children: [
      {
        name: '采购入库',
        path: '/purchaseManagement/purchaseInBound',
        icon: 'icon-caigouruku',
        menuId: '3001'
      },
      {
        name: '采购订单',
        path: '/purchaseManagement/purchaseOrder',
        icon: 'icon-caigoudingdan',
        menuId: '3002'
      }
    ]
  },
  {
    name: '基础设置',
    icon: 'icon-jichushezhi_jichushezhi',
    menuId: '2',
    path: '/basicSettings',
    children: [
      {
        name: '角色管理',
        path: '/basicSettings/roleManagement',
        icon: 'icon-shouye',
        menuId: '2001'
      },
      {
        name: '用户管理',
        path: '/basicSettings/userManagement',
        icon: 'icon-yonghuguanli',
        menuId: '2002'
      }
    ]
  }
];
