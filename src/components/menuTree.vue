<template>
  <div class="sidebar">
    <el-menu :collapse="sidebar.collapse" :default-active="onRoutes" active-text-color="#20a0ff"
      background-color="#324157" class="sidebar-el-menu" router text-color="#bfcbd9" unique-opened>
      <RecursiveMenu :MenuList="MenuList"/>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useSidebarStore } from '@/store/sidebar';
import { useRoute } from 'vue-router';
import { menuItem } from '@/type/menu/menu'
import RecursiveMenu from '@/components/RecursiveMenu.vue'
export default defineComponent({
  name: 'menuTree',
  setup() {
    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });
    const sidebar = useSidebarStore();
    return {
      route, onRoutes, sidebar,
    }
  },
  props: {
    MenuList: Array<menuItem>
  },
  components:{
    RecursiveMenu
  }
})
</script>

<style scoped>
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