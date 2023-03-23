import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import router from "@/router";
import { AuthStore } from "@/stores/modules/auth";
import { ElNotification } from "element-plus";
import { LOGIN_URL } from "@/config";
import { isType } from "@/utils/is";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

export const initDynamicRouter = async () => {
  const useAuthStore = AuthStore();
  const { setToken } = useGlobalSettingStore();

  try {
    // 1.获取菜单列表 && 按钮权限（可合并到一个接口获取，根据后端不同可自行改造）
    await useAuthStore.getAuthButtonList();
    await useAuthStore.getAuthMenuList();

    // 2.判断当前用户有没有菜单权限
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

    // 3.添加动态路由  会执行很多次~
    useAuthStore.flatMenuListGet.forEach((item: any) => {
      item.children && delete item.children;
      if (item.component && isType(item.component) == "string") {
        item.component = modules["/src/views" + item.component + ".vue"];
      }
      if (item.meta.isFull) {
        router.addRoute(item);
      } else {
        router.addRoute("layout", item);
      }

      // console.log(router.getRoutes(), "router..");
    });
  } catch (error) {
    console.log("baocuo!");
    setToken("");
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
};
