import { menuItem } from '@/type/menu/menu';
import { getSession, setSession } from '@/utils/storage/session';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDynamicRouterStore = defineStore('dynamicRouter', {
  state: () => {
    return {
      menuList: JSON.parse(
        getSession('menuList') || '[]'
      ) as Array<menuItem>,
      hasRoute: ref(false),
    };
  },
  getters: {},
  actions: {
    changeHasRoute(sate: boolean) {
      this.hasRoute = sate;
    },
    // 更新菜单列表,并且将菜单信息存入缓存
    UpdateMenuList(data: Array<menuItem>) {
      this.menuList = data;
      setSession('menuList', JSON.stringify(this.menuList));
    },
    resetMenuList() {
      sessionStorage.removeItem('menuList');
      this.hasRoute = false;
    },
    getMenuListType() {
      if (this.menuList.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
});
