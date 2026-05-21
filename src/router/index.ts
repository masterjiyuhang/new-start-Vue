import { useGlobalSettingStore } from "./../stores/modules/globalSetting";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config";
import { AuthStore } from "@/stores/modules/auth";
import NProgress from "@/utils/progress";
import { createRouter, createWebHashHistory } from "vue-router";
import { App } from "vue";

import { staticRouter, errorRouter } from "./basic";
import { initDynamicRouter } from "./dynamicRouter";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const resetRouter = () => {
  const authStore = AuthStore();
  authStore.flatMenuListGet.forEach((route) => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

router.beforeEach(async (to, from, next) => {
  const globalSetting = useGlobalSettingStore();

  NProgress.start();

  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (globalSetting.token) return next(from.fullPath);
    resetRouter();
    return next();
  }

  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  if (!globalSetting.token) return next({ path: LOGIN_URL, replace: true });

  const authStore = AuthStore();
  authStore.setRouteName(to.name as string);
  if (!authStore.authMenuListGet.length) {
    await initDynamicRouter(router);
    return next({ ...to, replace: true });
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

router.onError((error) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

export default router;

export function setupRouter(app: App<Element>) {
  app.use(router);
}
