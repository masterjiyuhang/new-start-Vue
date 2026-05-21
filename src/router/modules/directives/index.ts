export default {
  path: "/directives",
  name: "directives",
  redirect: "/directives/index",
  meta: {
    icon: "Stamp",
    title: "自定义指令",
    isLink: "",
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },
  children: [
    {
      path: "/directives/demo01",
      name: "selfDirectivesDemo1",
      component: "/directives/index",
      meta: {
        icon: "Stamp",
        title: "自定义指令-1",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
    {
      path: "/directives/demo02",
      name: "selfDirectivesDemo2",
      component: "/directives/selfDirective/index",
      meta: {
        icon: "Stamp",
        title: "自定义指令-2",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
  ],
} satisfies Menu.MenuOptions;
