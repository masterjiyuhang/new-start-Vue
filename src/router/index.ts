import { createRouter, createWebHistory } from "vue-router";

const LAYOUT = () => import("@/layout/index.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LAYOUT,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/dashboard/index.vue"),
        },
        {
          path: "/welcome",
          name: "welcome",
          component: () => import("../views/welcome/index.vue"),
        },
        {
          path: "/car",
          name: "车辆管理",
          redirect: "/car/list",
          meta: {
            weight: -2,
            icon: "Menu",
          },
          children: [
            {
              path: "/car/list",
              name: "列表",
              // D:\workplace\learn\new-start-Vue\src\views\car\CarDetail.vue
              component: () => import("@/views/car/index.vue"),
              meta: {
                icon: "Apple",
              },
            },
            {
              path: "/car/detail",
              name: "详情",
              component: () => import("@/views/car/CarDetail.vue"),
              meta: {
                icon: "Apple",
              },
            },
          ],
        },
      ],
    },
  ],
});

export default router;
