export default {
  path: "/car",
  redirect: "/car/index",
  meta: {
    icon: "guide",
    title: "列表页",
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
        title: "汽车管理",
      },
    },
  ],
};
