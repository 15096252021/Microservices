/** @format */

import { defineStore } from "pinia";

// 是否展开侧边栏
export const useSidebarStore = defineStore("sidebar", {
  state: () => {
    return {
      collapse: false,
    };
  },
  getters: {},
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse;
    },
  },
});
