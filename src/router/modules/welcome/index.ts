export default {
  path: "/welcome",
  name: "welcome",
  component: () => import("@/views/welcome/index.vue"),
  meta: {
    weight: 2,
    icon: "House",
    isMenu: true,
    title: "欢迎光临",
  },
};
