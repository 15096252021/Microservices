<template>
  <div v-if="tags.show" class="tags">
    <ul class="tags-ul">
      <li
        class="tags-ul-li"
        v-for="(item, index) in tags.list"
        :key="index"
        :class="{ active: isActive(item.path) }">
        <router-link :to="item.path" class="tags-ul-li-title">{{
          item.title
        }}</router-link>
        <el-icon @click="closeTags(index)">
          <Close />
        </el-icon>
      </li>
    </ul>
    <div class="tags-selcet">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTagsStore } from '@/store/tags';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';
const route = useRoute();
const router = useRouter();

// 是否为激活状态
const isActive = (path: string) => {
  return path === route.fullPath;
};

// 获取标签列表
const tags = useTagsStore();

// 关闭单个标签
const closeTags = (index: number) => {
  // 删除标签
  const delItem = tags.list[index];
  tags.delTagsItem(index);

  // 切换标签为下一个或者上一个
  const item = tags.list[index + 1]
    ? tags.list[index + 1]
    : tags.list[index - 1];
  if (item) {
    delItem.path === route.fullPath && router.push(item.path);
  } else {
    // router.push('Viedo');
  }
};

// 设置标签
const setTags = (route: any) => {
  // 判断标签是否存在
  const isExist = tags.list.some((item) => {
    return item.path === route.fullPath;
  });

  // 不存在则新增
  if (!isExist) {
    // 如果标签超过8个，则删除最久的那个
    if (tags.list.length >= 8) tags.delTagsItem(0);
    // 添加新的标签
    tags.setTagsItem({
      name: route.name,
      title: route.meta.menu_name || '页面',
      path: route.fullPath,
    });
  }
};
// 组件挂载之前添加一个默认路由
// onBeforeMount(() => {
//   // 挂载组件时，写入默认的标签
//   if (tags.list.length == 0) {
//     tags.setTagsItem({
//       name: 'Viedo',
//       title: '首页',
//       path: '/Viedo',
//     });
//   }
// });
// 路由更新之前，设置标签为要跳转的路由
onBeforeRouteUpdate((to) => {
  setTags(to);
});

// 关闭全部标签
const closeAll = () => {
  tags.clearTags();
  // router.push('404');
};

// 关闭其他标签
const closeOther = () => {
  const curItem = tags.list.filter((item) => {
    return item.path === route.fullPath;
  });
  tags.closeTagsOther(curItem);
};

// 点击标签选项
const handleTags = (command: string) => {
  command === 'other' ? closeOther() : closeAll();
};
</script>

<style lang="scss" scoped>
.tags {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 5px 10px #ddd;
  display: flex;
  &-ul {
    width: calc(100% - 110px);
    height: 100%;
    &-li {
      display: flex;
      align-items: center;
      float: left;
      margin: 3px 5px 2px 3px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 23px;
      border: 1px solid #e9eaec;
      background: #fff;
      padding: 0 5px 0 12px;
      color: #666;
      -webkit-transition: all 0.3s ease-in;
      -moz-transition: all 0.3s ease-in;
      transition: all 0.3s ease-in;
      &-title {
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
      }
    }
    &-li:not(.active):hover {
      background: #f8f8f8;
    }
  }
  &-selcet {
    width: 110px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
}

.active {
  color: rgb(17, 124, 212);
}
.active .tags-ul-li-title {
  color: rgb(17, 124, 212);
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 0rem;
  margin-block-end: 0rem;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
</style>
