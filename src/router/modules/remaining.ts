const remainingRouter = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录页",
      showLink: false,
      rank: 101,
    },
  },
];

export default remainingRouter;
