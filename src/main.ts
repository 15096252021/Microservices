/** @format */

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createRouterGuard } from "@/guard";
// import "@/mook/index.js"
async function setupApp() {
  const app = createApp(App);
  // 使用pinia和ElementPlus
  app.use(createPinia);
  app.use(ElementPlus);
  // 加载路由
  createRouterGuard(app);
  app.mount("#app");
}
setupApp();
document.title = import.meta.env.VITE_TITLE || "";
