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
      ],
    },
  ],
});

export default router;
