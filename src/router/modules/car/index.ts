export default {
  path: "/car",
  name: "car",
  meta: {
    title: "准备飙车",
    icon: "Menu",
    isLink: "",
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },
  redirect: "/car/list",
  children: [
    {
      path: "/car/list",
      name: "carList",
      component: "/car/index",
      // component: () => import("@/views/car/index.vue"),
      meta: {
        title: "车辆列表",
        icon: "Apple",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
    {
      path: "/car/management",
      name: "carManagement",
      component: "/car/management",
      meta: {
        title: "车辆管理",
        icon: "Apple",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
    {
      path: "/car/type",
      name: "carType",
      component: "/car/CarType",
      meta: {
        title: "车辆类型",
        icon: "Apple",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
    {
      path: "/car/detail/:id",
      name: "carDetail",
      component: "/car/CarDetail",
      // component: () => import("@/views/car/CarDetail.vue"),
      meta: {
        title: "车辆管理-详情",
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
