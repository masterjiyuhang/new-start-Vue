export default {
  path: "/tools",
  name: "tools",
  redirect: "/tools/n1",
  meta: {
    icon: "Tools",
    title: "常用工具",
    isLink: "",
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },
  children: [
    {
      path: "/tools/n1",
      name: "tools-n1",
      component: "/system/toolsManage/n1/index",
      meta: {
        icon: "Operation",
        title: "音乐转换flac2mp3",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
    {
      path: "/tools/n2",
      name: "tools-n2",
      component: "/system/toolsManage/n2/index",
      meta: {
        icon: "Operation",
        title: "音乐解密",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
  ],
};
