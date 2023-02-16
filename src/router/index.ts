import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/dashboard/index.vue"),
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../views/welcome/index.vue"),
    },
  ],
});

export default router;
