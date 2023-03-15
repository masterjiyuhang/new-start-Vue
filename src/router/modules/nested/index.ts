export default {
  path: "/nested",
  name: "NestedMenu",
  meta: {
    weight: 1,
    title: "一级菜单",
    isMenu: true,
    icon: "Menu",
  },
  redirect: "/nested/menu1/menu1-1",
  children: [
    {
      path: "menu1",
      name: "Menu1",
      children: [
        {
          path: "menu1-1",
          component: () => import("@/views/nested/menu1/menu1-1/index.vue"),
          name: "Menu1-1",
          meta: {
            title: "三级菜单1",
            isMenu: true,
            icon: "Apple",
          },
        },
        {
          path: "menu1-2",
          component: () => import("@/views/nested/menu1/menu1-2/index.vue"),
          name: "Menu1-2",
          meta: {
            title: "三级菜单2",
            isMenu: true,
            icon: "Apple",
          },
        },
      ],
      meta: {
        title: "二级菜单2",
        isMenu: true,
        icon: "Menu",
      },
      redirect: "/nested/menu1/menu1-1",
    },
    {
      path: "menu2",
      name: "Menu2",
      component: () => import("@/views/nested/menu2/index.vue"),
      meta: {
        title: "二级菜单2",
        isMenu: true,
        icon: "Apple",
      },
    },
  ],
};
