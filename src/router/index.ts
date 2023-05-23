import { useGlobalSettingStore } from "./../stores/modules/globalSetting";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config";
import { AuthStore } from "@/stores/modules/auth";
import NProgress from "@/utils/progress";
import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter, errorRouter } from "./basic";
import { initDynamicRouter } from "./dynamicRouter";
// const LAYOUT = () => import("@/layout/index.vue");

// console.log(staticRouter, "staticRouter");
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = AuthStore();
  authStore.flatMenuListGet.forEach((route) => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

/**
 * @description 路由拦截 beforeEach
 * */

router.beforeEach(async (to, from, next) => {
  const globalSetting = useGlobalSettingStore();

  // 1.NProgress 开始
  NProgress.start();

  // 2.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由并放行到登陆页
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (globalSetting.token) return next(from.fullPath);
    resetRouter();
    return next();
  }

  // 4.判断访问页面是否在路由白名单地址中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 5.判断是否有 Token，没有重定向到 login
  if (!globalSetting.token) return next({ path: LOGIN_URL, replace: true });

  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  const authStore = AuthStore();
  authStore.setRouteName(to.name as string);
  if (!authStore.authMenuListGet.length) {
    // console.log("路由守卫666666666", to);
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  // console.log(to, "路由守卫，这货是啥");

  // 7.正常访问页面
  next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});
export default router;
