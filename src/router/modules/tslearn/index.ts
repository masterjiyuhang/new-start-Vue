export default {
  path: "/ts/learnTS",
  name: "lesson1",
  redirect: "/ts/learnTS/lesson1",
  meta: {
    icon: "Menu",
    title: "TypeScript学习",
    isLink: "",
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },
  children: [
    {
      path: "/ts/learnTS/lesson1",
      name: "leson1",
      component: "/tsLearn/lesson1",
      meta: {
        icon: "Menu",
        title: "第一节-基础类型",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
    {
      path: "/ts/learnTS/lesson2",
      name: "leson2",
      component: "/tsLearn/lesson2",
      meta: {
        icon: "Menu",
        title: "第二节-基础类型",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
  ],
};
