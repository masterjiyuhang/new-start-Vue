export default {
  path: "/welcome",
  name: "welcome",
  weight: 10,
  component: "/welcome/index",
  meta: {
    icon: "House",
    title: "欢迎光临",
    isLink: "",
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },
} satisfies Menu.MenuOptions;
