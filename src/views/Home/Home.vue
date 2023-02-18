<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-loading="loading" style="height: 100%;">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <!-- <sidebar /> -->
          <menuTree :MenuList="items"></menuTree>
        </el-aside>
        <el-main>
          <el-container>
            <el-header>
              <tags />
            </el-header>
            <el-container>
              <el-main>
                <router-view></router-view>
              </el-main>
            </el-container>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">


import { defineComponent, ref } from 'vue'
import Header from "@/components/Header.vue"
import sidebar from "@/components/sidebar.vue"
import tags from '@/components/tags.vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store';
import { showLoading } from '@/utils/Loading';
export default defineComponent({
  setup() {
    const store = useStore();
    const { name } = storeToRefs(store);
    const chageName = () => {
      name.value = "大厦大家撒谎的骄傲和时间";
    }
    const loading = ref(true);
    showLoading(loading);
    const items = [
      {
        icon: 'Odometer',
        index: 'Viedo',  
        title: '系统首页',
        permission: '1',
      },
      {
        icon: 'Calendar',
        index: '1',
        title: '表格相关',
        permission: '2',
        children: [
          {
            index: '/table',
            title: '常用表格',
            permission: '2',
          },
          {
            index: '/import',
            title: '导入Excel',
            permission: '2',
          },
          {
            index: '/export',
            title: '导出Excel',
            permission: '2',
          },
        ],
      },
      {
        icon: 'DocumentCopy',
        index: '/tabs',
        title: 'tab选项卡',
        permission: '3',
      },
      {
        icon: 'Edit',
        index: '3',
        title: '表单相关',
        permission: '4',
        children: [
          {
            index: '/form',
            title: '基本表单',
            permission: '5',
          },
          {
            index: '/upload',
            title: '文件上传',
            permission: '6',
          },
          {
            index: '4',
            title: '三级菜单',
            permission: '7',
            children: [
              {
                index: '/editor',
                title: '富文本编辑器',
                permission: '8',
              },
              {
                index: '/markdown',
                title: 'markdown编辑器',
                permission: '9',
                children: [
                  {
                    index: '150',
                    title: '4级菜单',
                    permission: '7',
                    children: [
                      {
                        index: '/editor',
                        title: '富文本编辑器',
                        permission: '8',
                      },
                      {
                        index: '/markdown',
                        title: 'markdown编辑器',
                        permission: '9',
                      },
                    ],
                  },
                ]
              },

            ],
          },
        ],
      },
      {
        icon: 'Setting',
        index: '/icon',
        title: '自定义图标',
        permission: '10',
      },
      {
        icon: 'PieChart',
        index: '/charts',
        title: 'schart图表',
        permission: '11',
      },
      {
        icon: 'Warning',
        index: '/permissionion',
        title: '权限管理',
        permission: '13',
      }
    ];
    return {
      name, chageName, loading, items
    }
  },
  components: {
    Header, sidebar, tags
  }
})
</script>

<style lang="scss" scoped>
:root {
  --el-header-padding: 0 0;
  --div-margin-left: 10px;
}

.el-header {
  --el-header-padding: 0;
}

.el-main {
  --el-main-padding: 0;
}

.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 3.75rem;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar>ul {
  height: 100%;
}
</style>