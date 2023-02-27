<!-- @format -->

<template>
  <el-menu
    class="sidebar"
    :collapse="sidebar.collapse"
    :default-active="onRoutes"
    active-text-color="#20a0ff"
    background-color="#324157"
    :router="true"
    :collapse-transition="false"
    text-color="#bfcbd9"
    unique-opened>
    <RecursiveMenu :MenuList="MenuList" />
  </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useSidebarStore } from '@/store/sidebar';
import { useRoute } from 'vue-router';
import RecursiveMenu from '@/components/common/RecursiveMenu.vue';
import { menuItem } from '@/type/menu/menu';
import { getMenu } from '@/api/router';
import { useDynamicRouterStore } from '@/store/router/dynamicRouter';
export default defineComponent({
  name: 'menuTree',
  setup() {
    const route = useRoute();
    const onRoutes = computed(() => route.path);
    const sidebar = useSidebarStore();
    const dynamicRouterStore = useDynamicRouterStore();
    const data = reactive({
      MenuList: [] as Array<menuItem>,
    });
    onMounted(async () => {
      if (!Boolean(dynamicRouterStore.hasRoute)) {
        await getMenu().then((res) => {
          dynamicRouterStore.UpdateMenuList(res.data);
          
        });
      }
      data.MenuList = dynamicRouterStore.menuList as Array<menuItem>;
    });
    return {
      onRoutes,
      sidebar,
      ...toRefs(data),
    };
  },
  components: {
    RecursiveMenu,
  },
});
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: none !important;
}
</style>
