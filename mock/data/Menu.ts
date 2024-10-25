export const menu = [
  {
    path: '/',
    menuId: '1',
  },
  {
    menuId: '3',
    path: '/purchaseManagement',
    children: [
      {
        path: '/purchaseManagement/purchaseInbound',
        menuId: '3001',
      },
      {
        path: '/purchaseManagement/purchaseOrder',
        menuId: '3002',
      },
    ],
  },
  {
    menuId: '2',
    path: '/basicSettings',
    children: [
      {
        path: '/basicSettings/roleManagement',
        menuId: '2001',
      },
      {
        path: '/basicSettings/userManagement',
        menuId: '2002',
      },
    ],
  },
]
