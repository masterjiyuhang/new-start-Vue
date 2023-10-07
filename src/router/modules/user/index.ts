export default {
  path: "/user",
  name: "user",
  meta: {
    title: "用户中心",
    icon: "Menu",
    isLink: "",
    isHide: true,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },
  redirect: "/user/list",
  children: [
    {
      path: "/user/list",
      name: "userList",
      component: "/user/index",
      // component: () => import("@/views/car/index.vue"),
      meta: {
        title: "用户列表",
        icon: "Apple",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },

    {
      path: "/user/detail/:id",
      name: "userDetail",
      component: "/user/CarDetail",
      // component: () => import("@/views/car/CarDetail.vue"),
      meta: {
        title: "个人详情",
        icon: "Apple",
        isLink: "",
        isHide: true,
        isFull: false,
        isAffix: false,
        isDetail: true,
        isKeepAlive: true,
      },
    },
  ],
};
