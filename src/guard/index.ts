/** @format */

import router from "@/router";
import { usePermissionStore } from "@/store/permission";
import type { App } from "vue";
import { RouteRecordName } from "vue-router";
// 创建路由守卫
export function createRouterGuard(app: App) {
  app.use(router);
  // 路由守卫=
  router.beforeEach(async (to, form, next) => {
     // 设置标题
     document.title = `${to.meta.title  || ''} 后台管理系统`;
     // 获取角色
     const role = localStorage.getItem('zdp_admin_template_username');
     // 获取角色的权限
    //  const permission = usePermissionStore();
    if (
      to.name !== "Login" &&
      !sessionStorage.getItem("token") &&
      import.meta.env.VITE_SKIP_LOGIN == "N" &&
      !checkWileRouter(to.name)
    ) {
      next({ name: "Login" });
    } else {
      if (
        to.name == "Login" &&
        (sessionStorage.getItem("token") ||
          import.meta.env.VITE_SKIP_LOGIN == "Y")
      ) {
        next({ name: "home" });
      } else {
        next();
      }
    }
  });
}
// 不需要登录的白名单
export function checkWileRouter(name: RouteRecordName | null | undefined) {
  const whileRouter = ["404", "403", "500", "NotFound"];
  return whileRouter.includes(name ? name.toString() : "");
}
