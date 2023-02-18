/** @format */

import { defineStore } from "pinia";

// 对象列表接口
interface ObjectList {
  [key: string]: string[];
}

// 权限存储器
export const usePermissionStore = defineStore("permission", {
  state: () => {
    // 所有的权限
    const keys = localStorage.getItem("zdp_admin_template_keys");
    return {
      key: keys ? JSON.parse(keys) : <string[]>[],
      // 默认列表
      defaultList: <ObjectList>{
        // 管理员的权限
        admin: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
        ],
        // 普通用户的权限
        user: ["1", "2", "3", "11", "13", "14", "15"],
      },
    };
  },
  actions: {
    // 修改权限列表
    handleSet(val: string[]) {
      this.key = val;
    },
  },
});
