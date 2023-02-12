export const data1 = [
  { path: "/dashboard", parentPath: "/", meta: { title: "自己加进去的首页" } },
  {
    path: "/car",
    redirect: "/car/index",
    meta: { icon: "guide", title: "列表页", rank: 2 },
    children: [
      {
        path: "/car/index",
        name: "CarManagement",
        meta: { title: "汽车管理" },
      },
      { path: "/car/detail", name: "CarDetail", meta: { title: "汽车详情" } },
    ],
  },
  {
    path: "/car/index",
    name: "CarManagement",
    meta: { title: "汽车管理" },
    where: "路由守卫",
  },
];

const data2 = [
  { path: "/dashboard", parentPath: "/", meta: { title: "自己加进去的首页" } },
  {
    path: "/car",
    redirect: "/car/index",
    meta: { icon: "guide", title: "列表页", rank: 2 },
    children: [
      {
        path: "/car/index",
        name: "CarManagement",
        meta: { title: "汽车管理" },
      },
      { path: "/car/detail", name: "CarDetail", meta: { title: "汽车详情" } },
    ],
  },
  {
    path: "/car/detail",
    parentPath: "/car",
    meta: { title: "汽车详情" },
    name: "CarDetail",
  },
];
