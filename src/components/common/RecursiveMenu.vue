<template>
  <template v-for="menu in MenuList">
    <template v-if="menu.children">
      <el-sub-menu :key="menu.router_path" :index="menu.router_path">
        <template #title>
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <span>{{ menu.menu_name }}</span>
        </template>
        <RecursiveMenu :MenuList="menu.children" />
      </el-sub-menu>
    </template>
    <!--渲染菜单-->
    <template v-else>
      <el-menu-item :key="menu.router_path" :index="menu.router_path">
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        <template #title>{{ menu.menu_name }}</template>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts">
import { menuItem } from '@/type/menu/menu';
import { defineComponent } from 'vue';

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