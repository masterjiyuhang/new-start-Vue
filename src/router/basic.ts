import { HOME_URL, LOGIN_URL } from "@/config/index";
import { RouteRecordRaw } from "vue-router";

const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts"], {
  eager: true,
});

// 导出constantMenus作为待处理的menu菜单
const constantMenuRoutes: any[] = [];

Object.keys(modules).forEach((key) => {
  constantMenuRoutes.push(modules[key].default);
});

// modules下面导出的路由信息
export const moduleRouteList = constantMenuRoutes;
console.log(constantMenuRoutes, "constantMenus");

export const PAGE_NOT_FOUND_ROUTE = {
  path: "/:path(.*)*",
  name: "PageNotFound",
  component: () => import("@/views/error/404.vue"),
  meta: {
    title: "404 page.",
    isMenu: false,
    icon: "",
  },
};

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL,
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    children: [...moduleRouteList],
  },
];

export const errorRouter: RouteRecordRaw[] = [
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404页面",
    },
  },
  // 解决刷新页面，路由警告
  {
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
  },
];
