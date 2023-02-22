export default {
  path: "/car",
  name: "car",
  meta: {
    title: "车辆管理",
    isMenu: true,
    weight: -2,
    icon: "Menu",
  },
  children: [
    {
      path: "list",
      name: "list",
      component: () => import("@/views/car/index.vue"),
      meta: {
        title: "列表",
        icon: "Apple",
        isMenu: true,
      },
    },
    {
      path: "detail",
      name: "detail",
      component: () => import("@/views/car/CarDetail.vue"),
      meta: {
        title: "详情",
        icon: "Apple",
        isMenu: true,
      },
    },
  ],
};
