import { buildHierarchyTree } from "./../utils/tree";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw, RouteComponent } from "vue-router";

import remainingRouter from "./modules/remaining";

import {
  ascending,
  formatFlatteningRoutes,
  formatTwoStageRoutes,
  initRouter,
} from "./utils";

const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true,
  }
);

/** 原始静态路由（未做任何处理） */
const routes = [] as any;

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

console.log(
  "格式化之后的路由",
  formatTwoStageRoutes(
    formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
  )
);

export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
);

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(routes).concat(
  ...remainingRouter
);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
});

router.beforeEach((to, from, next) => {
  initRouter();
  next();
});
export default router;
