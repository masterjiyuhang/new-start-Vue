import { HOME_URL, LOGIN_URL } from "@/config/index";
import type { RouteRecordRaw } from "vue-router";

const modules: Record<string, { default: Menu.MenuOptions }> = import.meta.glob(
  ["./modules/**/*.ts"],
  { eager: true },
);

const constantMenuRoutes: Menu.MenuOptions[] = [];

Object.keys(modules).forEach((key) => {
  constantMenuRoutes.push(modules[key].default);
});

export const moduleRouteList = constantMenuRoutes;

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
    redirect: HOME_URL,
    children: [],
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
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
  },
];
