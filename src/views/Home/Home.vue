<!-- @format -->

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container v-loading="loading" class="home" element-loading-text="加载中">
    <el-header height="60px">
      <Header></Header>
    </el-header>
    <el-container class="home-body">
      <el-aside class="home-body-aside" :style="shrinkORNot">
        <menuTree :MenuList="items" />
      </el-aside>
      <el-main class="home-body-content" :style="contentWidth">
        <el-header class="home-body-content-crumbs">
          <tags />
        </el-header>
        <el-main class="home-body-content-main">
          <router-view></router-view>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Header from "@/components/Header.vue";
import sidebar from "@/components/sidebar.vue";
import tags from "@/components/tags.vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { showLoading } from "@/utils/Loading";
import { useSidebarStore } from "@/store/sidebar";
export default defineComponent({
  setup() {
    const store = useStore();
    const { name } = storeToRefs(store);
    const loading = ref(true);
    showLoading(loading);
    const items = [
      {
        icon: "Odometer",
        index: "/Viedo",
        title: "系统首页",
        permission: "1",
      },
      {
        icon: "Calendar",
        index: "1",
        title: "表格相关",
        permission: "2",
        children: [
          {
            index: "/table",
            title: "常用表格",
            permission: "2",
          },
          {
            index: "/import",
            title: "导入Excel",
            permission: "2",
          },
          {
            index: "/export",
            title: "导出Excel",
            permission: "2",
          },
        ],
      },
      {
        icon: "DocumentCopy",
        index: "/tabs",
        title: "tab选项卡",
        permission: "3",
      },
      {
        icon: "Edit",
        index: "3",
        title: "表单相关",
        permission: "4",
        children: [
          {
            index: "/form",
            title: "基本表单",
            permission: "5",
          },
          {
            index: "/upload",
            title: "文件上传",
            permission: "6",
          },
          {
            index: "4",
            title: "三级菜单",
            permission: "7",
            children: [
              {
                index: "/editor",
                title: "富文本编辑器",
                permission: "8",
              },
              {
                index: "/markdown",
                title: "markdown编辑器",
                permission: "9",
                children: [
                  {
                    index: "150",
                    title: "4级菜单",
                    permission: "7",
                    children: [
                      {
                        index: "/editor",
                        title: "富文本编辑器",
                        permission: "8",
                      },
                      {
                        index: "/markdown",
                        title: "markdown编辑器",
                        permission: "9",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        icon: "Setting",
        index: "/icon",
        title: "自定义图标",
        permission: "10",
      },
      {
        icon: "PieChart",
        index: "/charts",
        title: "schart图表",
        permission: "11",
      },
      {
        icon: "Warning",
        index: "/permissionion",
        title: "权限管理",
        permission: "13",
      },
      {
        icon: "Setting",
        index: "/icon",
        title: "自定义图标",
        permission: "10",
      },
      {
        icon: "PieChart",
        index: "/charts",
        title: "chart图表",
        permission: "11",
      },
      {
        icon: "Warning",
        index: "/permissionion",
        title: "权限管理",
        permission: "13",
      },
    ];

    // 侧边栏状态管理器
    const sidebar = useSidebarStore();

    const shrinkORNot = computed(() => {
      return !sidebar.collapse ? { width: "250px" } : { width: "60px" };
    });
    const contentWidth = computed(() =>
      !sidebar.collapse
        ? { width: "calc(100% - 250px)" }
        : { width: "calc(100% - 60px)" }
    );
    return {
      name,
      loading,
      items,
      shrinkORNot,
      contentWidth,
    };
  },
  components: {
    Header,
    sidebar,
    tags,
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  &-body {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    &-aside {
      height: 100%;
      overflow-x: hidden;
    }
    &-content {
      height: 100%;

      &-crumbs {
        height: 35px;
        width: 100%;
        border-bottom: 1px solid #ccc;
      }
      &-main {
        height: calc(100% - 35px);
        width: 100%;
        background-color: #fff;
      }
    }
  }
}

:root {
  --el-header-padding: 0;
  --div-margin-left: 10px;
  --el-main-padding: 0;
}

.el-header {
  --el-header-padding: 0;
}

.el-main {
  --el-main-padding: 0;
}
/* 加过渡给侧边导航*/
.el-aside {
  transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -moz-transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -o-transition: width 0.5s;
}
/*加快侧边栏文字消失的速度*/
.el-menu {
  transition: all 10ms;
}
</style>
