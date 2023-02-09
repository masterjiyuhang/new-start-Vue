import { isProxy, toRaw } from "vue";
import type { RouteRecordRaw } from "vue-router";

export const findCurrentRouteByPath = (
  path: string,
  routes: RouteRecordRaw[]
) => {
  let res = routes.find((item) => item.path === path);

  if (res) {
    return isProxy(res) ? toRaw(res) : res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (
        routes[i].children instanceof Array &&
        routes[i].children!.length > 0
      ) {
        res = findCurrentRouteByPath(path, routes[i].children!);
        if (res) {
          return isProxy(res) ? toRaw(res) : res;
        }
      }
    }
  }
  return null;
};

export default { findCurrentRouteByPath };
