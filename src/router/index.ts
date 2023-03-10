import NProgress from "@/utils/progress";
import { createRouter, createWebHistory } from "vue-router";
import { PAGE_NOT_FOUND_ROUTE } from "./basic";
const LAYOUT = () => import("@/layout/index.vue");
// import { useGlobalSettingStoreWithOut } from "@/stores/modules/globalSetting";

const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts"], {
  eager: true,
});

const routes: any[] = [];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

// 导出routes作为待处理的menu菜单
export const constantMenus = routes;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LAYOUT,
      redirect: "/dashboard",
      children: [...constantMenus, PAGE_NOT_FOUND_ROUTE],
    },
  ],
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  // const { initIsCollapse } = useGlobalSettingStoreWithOut();
  // initIsCollapse();
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
