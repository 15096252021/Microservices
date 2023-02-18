import { App } from "vue";
import menuTree from "@/components/menuTree.vue"

// 全局挂载组件
export function GlobalMount(app:App){
  app.component("menuTree",menuTree);
}