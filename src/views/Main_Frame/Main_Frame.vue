<!-- @format -->

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container v-loading="loading" class="home" element-loading-text="加载中">
    <el-header height="60px">
      <Header></Header>
    </el-header>
    <el-container class="home-body">
      <el-aside class="home-body-aside" :style="shrinkORNot">
        <menuTree/>
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
import { defineComponent, ref, computed } from 'vue';
import Header from '@/components/common/Header.vue';
import sidebar from '@/components/common/sidebar.vue';
import tags from '@/components/common/tags.vue';
import { showLoading } from '@/utils/Loading';
import { useSidebarStore } from '@/store/sidebar';
export default defineComponent({
  name: 'Main_Frame',
  setup() {
    const loading = ref(true);
    showLoading(loading);
    // 侧边栏状态管理器
    const sidebar = useSidebarStore();
    
    const shrinkORNot = computed(() => {
      return !sidebar.collapse ? { width: '250px' } : { width: '60px' };
    });
    const contentWidth = computed(() =>
      !sidebar.collapse
        ? { width: 'calc(100% - 250px)' }
        : { width: 'calc(100% - 60px)' }
    );
    return {
      loading,
      shrinkORNot,
      contentWidth
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
