import { App } from "vue";
import menuTree from "@/components/common/menuTree.vue"

// 全局挂载组件
export function GlobalMount(app:App){
  app.component("menuTree",menuTree);
}