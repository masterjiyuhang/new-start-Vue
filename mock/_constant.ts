export const routerList = {
  code: 200,
  msg: "成功",
  data: [
    {
      path: "/home/index",
      name: "home",
      component: "/home/index",
      weight: 999,
      meta: {
        icon: "HomeFilled",
        title: "首页",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: true,
        isKeepAlive: true,
      },
    },
  ],
};

export const authButtonList = {
  code: 200,
  data: {
    useProTable: ["add", "batchAdd", "export", "batchDelete", "status"],
    authButton: ["add", "edit", "delete", "import", "export"],
  },
  msg: "成功",
};
