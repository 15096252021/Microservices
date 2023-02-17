/** @format */

import router from "@/router";
import type { App } from "vue";
import { RouteRecordName } from "vue-router";
// 创建路由守卫
export function createRouterGuard(app: App) {
  app.use(router);
  // 路由守卫=
  router.beforeEach(async (to, form, next) => {
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
