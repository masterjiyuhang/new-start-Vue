import type { RouteLocationMatched } from "vue-router";

export function useNav() {
  // 判断是否是首页
  const isDashboard = (route: RouteLocationMatched): boolean | string => {
    const name = route && (route.name as string);
    if (!name) return false;
    return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
  };

  return {
    isDashboard,
  };
}
