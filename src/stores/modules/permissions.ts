import { constantMenus } from "@/router";
import { defineStore } from "pinia";
import { store } from "@/stores";
import { ascending, filterTree } from "@/router/utils";
const usePermissionStore = defineStore({
  id: "permission",
  state: () => ({
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 深拷贝一个菜单树，与导航菜单不突出
    menusTree: [],
    buttonAuth: [],
    // 缓存页面keepAlive
    cachePageList: [],
  }),
  actions: {
    handleWholeMenus(routes: any[]) {
      if (this.wholeMenus.length > 0) return;
      this.wholeMenus = filterTree(
        ascending(this.constantMenus.concat(routes))
      );
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
