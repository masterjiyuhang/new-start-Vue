export default {
  path: "/system",
  name: "system",
  redirect: "/system/accountManage",
  meta: {
    icon: "Tools",
    title: "系统管理",
    isLink: "",
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },
  children: [
    {
      path: "/system/dictManage",
      name: "dictManage",
      redirect: "/system/dictManage/defaultDictManage",
      meta: {
        icon: "Menu",
        title: "字典管理",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
      children: [
        {
          path: "/system/dictManage/defaultDictManage",
          name: "carDict",
          component: "/system/dictManage/default/index",
          meta: {
            icon: "Operation",
            title: "默认字典管理",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false,
            isKeepAlive: true,
          },
        },
      ],
    },
  ],
} satisfies Menu.MenuOptions;
