import { buildHierarchyTree } from "./../utils/tree";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import {
  ascending,
  formatFlatteningRoutes,
  formatTwoStageRoutes,
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
  formatTwoStageRoutes(
    formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
  )
);

export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
});

export default router;
