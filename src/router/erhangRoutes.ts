import type { RouteRecordRaw } from "vue-router";

export const erHangBaseRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/erHangLayout/index.vue"),
    redirect: "/dashboard",
    // meta: {
    //   title: "首页",
    //   rank: 0,
    // },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "首页",
          rank: 0,
        },
      },
      {
        path: "/able",
        redirect: "/able/index",
        meta: {
          icon: "guide",
          title: "能力列表",
          rank: 2,
        },
        children: [
          {
            path: "/able/index",
            name: "HomeView",
            component: () => import("@/views/HomeView.vue"),
            meta: {
              title: "HOME页",
            },
          },
          {
            path: "/able/about",
            name: "AboutView",
            component: () => import("@/views/AboutView.vue"),
            meta: {
              title: "ABOUT页",
            },
          },
        ],
      },
      {
        path: "/car",
        redirect: "/car/index",
        meta: {
          icon: "guide",
          title: "汽车相关",
          rank: 2,
        },
        children: [
          {
            path: "/car/index",
            name: "CarManagement",
            component: () => import("@/views/car/index.vue"),
            meta: {
              title: "汽车管理",
            },
          },
          {
            path: "/car/detail",
            name: "CarDetail",
            component: () => import("@/views/car/CarDetail.vue"),
            meta: {
              title: "汽车详情",
            },
          },
        ],
      },
    ],
  },
];
