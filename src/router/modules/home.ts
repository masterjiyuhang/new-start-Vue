const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    title: "首页",
    rank: 0,
  },
  children: [
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: "首页",
      },
    },
  ],
};
