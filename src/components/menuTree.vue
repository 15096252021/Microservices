<template>
    <el-menu
        class="sidebar"
        :collapse="sidebar.collapse"
        :default-active="onRoutes"
        active-text-color="#20a0ff"
        background-color="#324157"
        :router="true"
        text-color="#bfcbd9"
        unique-opened
    >
        <RecursiveMenu :MenuList="MenuList" />
    </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useSidebarStore } from '@/store/sidebar';
import { useRoute } from 'vue-router';
import { menuItem } from '@/type/menu/menu';
import RecursiveMenu from '@/components/RecursiveMenu.vue';
export default defineComponent({
    name: 'menuTree',
    setup() {
        const route = useRoute();
        const onRoutes = computed(() => route.path);
        const sidebar = useSidebarStore();

        return {
            route,
            onRoutes,
            sidebar,
        };
    },
    props: {
        MenuList: Array<menuItem>,
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
