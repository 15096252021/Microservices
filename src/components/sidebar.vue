<template>
    <div class="sidebar">
        <el-menu :collapse="sidebar.collapse" :default-active="onRoutes" active-text-color="#20a0ff"
            background-color="#324157" class="sidebar-el-menu" router text-color="#bfcbd9" unique-opened>
            <template v-for="item in items">
                <!--渲染二级菜单-->
                <template v-if="item.children">
                    <el-sub-menu :key="item.index" :index="item.index">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <!--渲染三级菜单-->
                        <template v-for="subItem in item.children">
                            <el-sub-menu v-if="subItem.children" :key="subItem.index" :index="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <!--渲染二级菜单-->
                            <el-menu-item v-else :index="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <!--渲染一级菜单-->
                <template v-else>
                    <el-menu-item :key="item.index" :index="item.index">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSidebarStore } from '@/store/sidebar';
import { useRoute } from 'vue-router';

const items = [
    {
        icon: 'Odometer',
        index: '/dashboard',
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
                                title: '级菜单',
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

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
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