<template>
  <template v-for="menu in MenuList">
    <template v-if="menu.children">
      <el-sub-menu :key="menu.index" :index="menu.index">
        <template #title>
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <span>{{ menu.title }}</span>
        </template>
        <RecursiveMenu :MenuList="menu.children" />
      </el-sub-menu>
    </template>
    <!--渲染菜单-->
    <template v-else>
      <el-menu-item :key="menu.index" :index="menu.index">
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        <template #title>{{ menu.title }}</template>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { menuItem } from '@/type/menu/menu'
export default defineComponent({
  name: 'RecursiveMenu',
  setup() {
    return {

    }
  },
  props: {
    MenuList: Array<menuItem>
  }
})
</script>