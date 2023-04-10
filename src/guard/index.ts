/** @format */

import { getMenu } from '@/api/router';
import router from '@/router';
import { useDynamicRouterStore } from '@/store/router/dynamicRouter';
import { menuItem } from '@/type/menu/menu';
import { App } from 'vue';
import { RouteMeta, Router, RouteRecordName } from 'vue-router';
import { getSession } from '@/utils/storage/session';
const modules = import.meta.glob('../views/**/*.vue');
// 创建路由守卫
export function createRouterGuard(app: App) {
  app.use(router);
  // 路由守卫=
  router.beforeEach(async (to, form, next) => {
    // 设置标题
    document.title = `后台管理系统`;
    initRouter();
    if (
      to.name !== 'Login' &&
      !getSession('token') &&
      import.meta.env.VITE_SKIP_LOGIN == 'N' &&
      !checkWileRouter(to.name)
    ) {
      next({ name: 'Login' });
    } else {
      if (to.name == 'Login' && getSession('token')) {
        next({ name: 'home' });
      } else {
        next();
      }
    }
  });
}
export async function initRouter() {
  const dynamicRouterStore = useDynamicRouterStore();
  // 判断是否添加过路由
  if (!Boolean(dynamicRouterStore.hasRoute)) {
    let menuList = dynamicRouterStore.menuList as Array<menuItem>;
    if (!dynamicRouterStore.getMenuListType()) {
      menuList = await getMenuList();
      dynamicRouterStore.UpdateMenuList(menuList);
    }
    console.log('加载路由');
    AddRouter(menuList, router);
    dynamicRouterStore.changeHasRoute(!Boolean(dynamicRouterStore.hasRoute));
  }
}
// 不需要登录的白名单
export function checkWileRouter(name: RouteRecordName | null | undefined) {
  const whileRouter = ['404', '403', '500', 'NotFound'];
  return whileRouter.includes(name ? name.toString() : '');
}
export async function getMenuList() {
  let menuList = [] as Array<menuItem>;
  await getMenu().then((res) => {
    menuList = res.data;
  });
  return menuList;
}
export function AddRouter(data: Array<menuItem>, router: Router) {
  // 遍历data
  data.forEach((item) => {
    const children = item.children;
    const menu_type = item.menu_type;
    const flag = item.flag;
    if (
      '02' == menu_type &&
      Boolean(flag) &&
      !children &&
      modules[`../views${item.router_component}.vue`]
    ) {
      let routers = {
        path: item.router_path,
        name: item.router_name,
        meta: item as unknown as RouteMeta,
        // 添加组件地址
        component: modules[`../views${item.router_component}.vue`],
      };
      router.addRoute('home', routers);
    } else {
      if (children) {
        AddRouter(children, router);
      }
    }
  });
}
