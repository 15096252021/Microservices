import { defineStore } from 'pinia';
import { Router, RouteRecordRaw } from 'vue-router';
const modules = import.meta.glob('../views/**/*.vue');
export const useDynamicRouterStore = defineStore('dynamicRouter', {
  state: () => {
    return {
      routes:
        JSON.parse(sessionStorage.getItem('routeMap') || '[]') ||
        ([] as Array<RouteRecordRaw>),
    };
  },
  getters: {},
  actions: {
    // 添加动态路由，并同步到状态管理器中
    setRouteMap(data: Array<any>) {
      this.routes = data;
      // 为了防止用户刷新页面导致动态创建的路由失效，将其存储在本地中
      sessionStorage.setItem('routeMap', JSON.stringify(this.routes));
    },
    AddDynamicRouteMap(data: Array<any>, router: Router) {
      data.forEach((item) => {
        let routers = {
          path: item.path,
          name: item.name,
          meta: item,
          // 添加组件地址
          component: modules[`../views${item.path}.vue`],
        };
        this.routes.push(routers);
        router.addRoute('home', routers);
      });
      this.setRouteMap(this.routes);
    },
    resetLogin() {
      sessionStorage.removeItem('routeMap');
    },
  },
});
