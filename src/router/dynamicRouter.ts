import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { AuthStore } from "@/stores/modules/auth";
import { ElNotification } from "element-plus";
import { LOGIN_URL } from "@/config";
import { isType } from "@/utils/is";
import type { Router } from "vue-router";

const modules = import.meta.glob("@/views/**/*.vue");

export const initDynamicRouter = async (router: Router) => {
  const useAuthStore = AuthStore();
  const { setToken } = useGlobalSettingStore();

  try {
    await useAuthStore.getAuthButtonList();
    await useAuthStore.getAuthMenuList();

    if (!useAuthStore.authMenuListGet.length) {
      ElNotification({
        title: "无权限访问",
        message: "当前账号无任何菜单权限，请联系系统管理员！",
        type: "warning",
        duration: 3000,
      });
      setToken("");
      router.replace(LOGIN_URL);
      return Promise.reject("No permission");
    }

    useAuthStore.flatMenuListGet.forEach((item: any) => {
      item.children && delete item.children;
      if (item.component && isType(item.component) === "string") {
        item.component = modules["/src/views" + item.component + ".vue"];
      }
      if (item.meta.isFull) {
        router.addRoute(item);
      } else {
        router.addRoute("layout", item);
      }
    });
  } catch (error) {
    setToken("");
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
};
