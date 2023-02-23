import { createRouter, createWebHistory } from "vue-router";

const LAYOUT = () => import("@/layout/index.vue");

const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts"], {
  eager: true,
});

const routes = [];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

// 导出routes作为待处理的menu菜单
export const constantMenus = routes;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LAYOUT,
      redirect: "/dashboard",
      children: [
        ...routes,
        // {
        //   path: "/dashboard",
        //   name: "dashboard",
        //   component: () => import("../views/dashboard/index.vue"),
        // },
        // {
        //   path: "/welcome",
        //   name: "welcome",
        //   component: () => import("../views/welcome/index.vue"),
        // },
        // {
        //   path: "/car",
        //   name: "车辆管理",
        //   redirect: "/car/list",
        //   meta: {
        //     weight: -2,
        //     icon: "Menu",
        //   },
        //   children: [
        //     {
        //       path: "/car/list",
        //       name: "列表",
        //       // D:\workplace\learn\new-start-Vue\src\views\car\CarDetail.vue
        //       component: () => import("@/views/car/index.vue"),
        //       meta: {
        //         icon: "Apple",
        //       },
        //     },
        //     {
        //       path: "/car/detail",
        //       name: "详情",
        //       component: () => import("@/views/car/CarDetail.vue"),
        //       meta: {
        //         icon: "Apple",
        //       },
        //     },
        //   ],
        // },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  console.log(from, to);
});
export default router;
