import type { RouteRecordRaw } from 'vue-router';
import router from '@/router/index';
import { notFoundPage, asyncRoutes } from '@/router/routes/asyncRoutes';

export const createRouters = (menuList: any) => {
  function createRoutes(menuList1: any, asyncRoutes1: RouteRecordRaw[], parentPath: string = ''): RouteRecordRaw[] {
    const routers: RouteRecordRaw[] = [];
    menuList1.forEach((menu: any) => {
      const result: RouteRecordRaw | undefined = asyncRoutes1.find((item) => {
        return parentPath + item.path === menu.path;
      });
      if (result) {
        if (menu?.children && menu?.children?.length && result.children && result?.children?.length) {
          // 递归处理子路由，并将结果赋值给当前路由的 children
          result.children = createRoutes(menu.children, result.children, `${result.path}/`);
        }
        // 将匹配到的路由添加到 routers 数组中
        routers.push(result);
      }
    });

    return routers;
  }
  const routeList = createRoutes(menuList, asyncRoutes);
  // 动态添加路由到布局路由中
  routeList.forEach((route) => {
    router.addRoute('layoutPage', route);
  });
  // 添加 404 页面路由
  router.addRoute('layoutPage', notFoundPage);
};
