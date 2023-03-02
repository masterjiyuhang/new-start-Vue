export default {
  path: "/learn",
  name: "learnVue3",
  meta: {
    weight: 1,
    title: "Vue3学习环境",
    isMenu: true,
    icon: "Menu",
  },
  children: [
    {
      path: "reactive",
      name: "Reactive",
      children: [
        {
          path: "study-ref",
          component: () => import("@/views/learn/reactive/ref.vue"),
          name: "ref",
          meta: {
            title: "ref",
            isMenu: true,
            icon: "Apple",
          },
        },
        {
          path: "study-reactive",
          component: () => import("@/views/learn/reactive/ref.vue"),
          name: "reactive",
          meta: {
            title: "reactive",
            isMenu: true,
            icon: "Apple",
          },
        },
        // {
        //   path: "study",
        //   component: () => import("@/views/learn/reactive/ref.vue"),
        //   name: "reactive",
        //   meta: {
        //     title: "reactive",
        //     isMenu: true,
        //     icon: "Apple",
        //   },
        // },
        {
          path: "study-to",
          component: () => import("@/views/learn/to/index.vue"),
          name: "to",
          meta: {
            title: "to..",
            isMenu: true,
            icon: "Apple",
          },
        },
      ],
      meta: {
        title: "响应式",
        isMenu: true,
        icon: "Menu",
      },
    },
    {
      path: "computed",
      name: "Computed",
      component: () => import("@/views/learn/computed/index.vue"),
      meta: {
        title: "计算属性",
        isMenu: true,
        icon: "Apple",
      },
    },
  ],
};
