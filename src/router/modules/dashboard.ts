export default {
  path: "/dashboard",
  redirect: "/dashboard/index",
  meta: {
    icon: "guide",
    title: "分析页",
    rank: 1,
  },
  children: [
    {
      path: "/dashboard/index",
      name: "Dashboard",
      component: () => import("@/views/dashboard/index.vue"),
      meta: {
        title: "分析页",
      },
    },
  ],
};
