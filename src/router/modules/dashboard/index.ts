export default {
  path: "/dashboard",
  name: "dashboard",
  component: () => import("@/views/dashboard/index.vue"),
  meta: {
    weight: 999,
    icon: "Food",
    isMenu: true,
    title: "统计页",
  },
};
