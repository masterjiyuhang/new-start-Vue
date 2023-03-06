import { ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

export function useTabs() {
  const historyMap = ref({});

  const formatName = (item: any) => {
    return item.name + JSON.stringify(item.query) + JSON.stringify(item.params);
  };

  const fmtTitle = (title: any, now: any) => {
    const reg = /\$\{(.+?)\}/;
    const reg_g = /\$\{(.+?)\}/g;
    const result = title.match(reg_g);
    if (result) {
      result.forEach((item: any) => {
        const key = item.match(reg)[1];
        const value = now.params[key] || now.query[key];
        title = title.replace(item, value);
      });
    }
    return title;
  };

  const isSame = (
    route1: RouteLocationNormalized,
    route2: RouteLocationNormalized
  ) => {
    if (route1.name !== route2.name) {
      return false;
    }
    if (
      Object.keys(route1.query).length !== Object.keys(route2.query).length ||
      Object.keys(route1.params).length !== Object.keys(route2.params).length
    ) {
      return false;
    }
    for (const key in route1.query) {
      if (route1.query[key] !== route2.query[key]) {
        return false;
      }
    }
    for (const key in route1.params) {
      if (route1.params[key] !== route2.params[key]) {
        return false;
      }
    }
    return true;
  };

  return {
    historyMap,
    isSame,
    formatName,
    fmtTitle,
  };
}
