/** @format */

import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home/Home.vue"),
    children: [
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/404.vue"),
      },
      {
        path: "/Viedo",
        name: "Viedo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/Viedo/Viedo.vue"),
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Login/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "about" */ "@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
