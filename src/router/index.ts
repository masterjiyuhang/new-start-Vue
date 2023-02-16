import { useTagListsStore } from "./../stores/modules/tagLists";
import { buildHierarchyTree } from "./../utils/tree";
import { createRouter, createWebHashHistory, Router } from "vue-router";
import type { RouteRecordRaw, RouteComponent } from "vue-router";

import remainingRouter from "./modules/remaining";

import { findCurrentRouteByPath } from "@/utils";

import { erHangBaseRoutes } from "./erhangRoutes";

import {
  ascending,
  formatFlatteningRoutes,
  formatTwoStageRoutes,
  initRouter,
} from "./utils";
import { useMultiTagsStoreHook } from "@/stores/modules/multiTags";

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
  // routes: constantRoutes,
  routes: erHangBaseRoutes,
});

router.beforeEach((to, from, next) => {
  initRouter().then((router: Router) => {
    const { path } = to;
    const routes: RouteRecordRaw[] = router.options.routes[0].children!;
    //  router, router.options.routes[0].children 这个就是layout下面的其他路由
    const route = findCurrentRouteByPath(path, routes);

    if (!from.name) {
      if (route && route.meta?.title) {
        useMultiTagsStoreHook().handleTags("push", {
          path: route.path,
          name: route.name,
          meta: route.meta,
          where: "路由守卫",
        });

        useTagListsStore().handleTags("push", {
          path: route.path,
          name: route.name,
          meta: route.meta,
          where: "路由守卫",
        });
      }
    }
  });
  next();
});
export default router;
