<!-- @format -->

<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChange">
      <el-icon v-if="sidebar.collapse">
        <Expand />
      </el-icon>
      <el-icon v-else>
        <Fold />
      </el-icon>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <el-tooltip content="更新缓存">
          <el-icon
            :size="30"
            @click="resetMenuList"
            style="left: 5px; cursor: pointer">
            <Sort />
          </el-icon>
        </el-tooltip>
        <!-- 消息中心 -->
        <div class="btn-bell" @click="router.push('/tabs')">
          <el-tooltip
            :content="message ? `有${message}条未读消息` : `消息中心`"
            effect="dark"
            placement="bottom">
            <i class="el-icon-lx-notice"></i>
          </el-tooltip>
          <span v-if="message" class="btn-bell-badge"></span>
        </div>
        <!-- 用户头像 -->
        <el-avatar :size="40" :src="imgUrl" class="user-avatar" />
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout" divided
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts" name="Header" setup>
import { inject, onMounted } from 'vue';
import { useSidebarStore } from '@/store/sidebar';
import { useDynamicRouterStore } from '@/store/router/dynamicRouter';
import { useRouter } from 'vue-router';
import imgUrl from '@/assets/logo.png';
import { ElMessage } from 'element-plus';
const DynamicRouterStore = useDynamicRouterStore();
const refers =  inject("reload") as any;
const resetMenuList = () => {
  DynamicRouterStore.resetMenuList();
  ElMessage({
    message: '刷新成功',
    type: 'success',
  });
  refers();
};
const username: string | null = localStorage.getItem(
  'zdp_admin_template_username'
);
const message: number = 2;

// 侧边栏状态管理器
const sidebar = useSidebarStore();

// 侧边栏折叠
const collapseChange = () => {
  sidebar.handleCollapse();
};

onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChange();
  }
});

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
  if (command == 'logout') {
    localStorage.removeItem('zdp_admin_template_username');
    router.push('/Login');
  } else if (command == 'user') {
    router.push('/user');
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 22px;
  color: #fff;
  background-color: #324157;
}
.collapse-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: left;
  padding: 0 21px;
  cursor: pointer;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 60px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.btn-bell-badge {
  position: absolute;
  right: 4px;
  top: 0px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-lx-notice {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avatar {
  margin-left: 20px;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
