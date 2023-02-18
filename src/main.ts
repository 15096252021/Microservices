/** @format */

import zhCn from "element-plus/es/locale/lang/zh-cn";
/** @format */
import { createApp } from "vue";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import { createRouterGuard } from "@/guard";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./styles/dark/css-vars.css";
import "./styles/element/index.scss";
import {GlobalMount} from '@/public/GlobalMount'
async function setupApp() {
  const app = createApp(App);
  // 使用pinia和ElementPlus
  app.use(createPinia());
  app.use(ElementPlus, {
    locale: zhCn,
  });
  // 加载路由
  createRouterGuard(app);
  // 注册elementplus图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  // 自定义权限指令
  // const permiss = usePermissionStore();
  // app.directive("permiss", {
  //   mounted(el, binding) {
  //     if (!permiss.key.includes(String(binding.value))) {
  //       el["hidden"] = true;
  //     }
  //   },
  // });
  // 挂载全局组件
  GlobalMount(app);
  app.mount("#app");
}
setupApp();
document.title = import.meta.env.VITE_TITLE || "";
