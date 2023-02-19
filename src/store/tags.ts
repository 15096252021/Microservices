import { useRouter } from 'vue-router';

/** @format */

import { defineStore } from "pinia";

interface ListItem {
  name: string;
  path: string;
  title: string;
}

// 用于存储tags标签
export const useTagsStore = defineStore("tags", {
  state: () => {
    return {
      // 标签列表
      list: <ListItem[]>[],
    };
  },
  getters: {
    // 是否显示
    show: (state) => {
      // 当list等于0时，让路由跳转到首页
      const router = useRouter();

      if (state.list.length === 0) {
        state.list.push({
          name: 'Viedo',
          title: '首页',
          path: '/Viedo',
        });
        router.push({ name: "Viedo" })
      }
      return state.list.length > 0;
    },
    // 标签名列表
    nameList: (state) => {
      return state.list.map((item) => item.name);
    },
  },
  actions: {
    // 删除标签
    delTagsItem(index: number) {
      this.list.splice(index, 1);
    },
    // 设置标签
    setTagsItem(data: ListItem) {
      this.list.push(data);
    },
    // 清空标签
    clearTags() {
      this.list = [];
    },
    // 关闭其他标签
    closeTagsOther(data: ListItem[]) {
      this.list = data;
    },
    // 关闭当前标签
    closeCurrentTag(data: any) {
      for (let i = 0, len = this.list.length; i < len; i++) {
        const item = this.list[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(this.list[i + 1].path);
          } else if (i > 0) {
            data.$router.push(this.list[i - 1].path);
          } else {
            // data.$router.push("/Viedo");
          }
          this.list.splice(i, 1);
          break;
        }
      }
    },
  },
});
