/** @format */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Main_Frame/Main_Frame.vue'),
    redirect: '/system/homepage',
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        meta: {
          menu_name: 404,
        },
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/404.vue'),
      },
      {
        path: '/system/homepage',
        name: 'homepage',
        meta: {
          name: '系统首页',
          menu_name: '系统首页1',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/system/Home_Page.vue'),
      },
    ],
  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Login/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
