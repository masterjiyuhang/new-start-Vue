import { nextTick, ref } from "vue";
import { defineStore } from "pinia";
import { store } from "../index";
import { emitter } from "@/utils/mitt";
import { DEFAULT_PRIMARY } from "@/config";
import { AssemblySizeType, ThemeConfigProps } from "../interface";
import { piniaPersistConfig } from "../storePlugin";
// import { piniaPersistConfig } from "./../storePlugin";

export const useGlobalSettingStore = defineStore(
  "globalSetting",
  () => {
    const isCollapse = initIsCollapse();

    const token = ref<string>("");

    // 用户id
    const userId = ref<string | number>("");

    const assemblySize = ref<string>("default");

    const keepAliveName = ref<string[]>([]);

    const language = ref<string>("en");

    const ThemeConfig = ref<ThemeConfigProps>({
      // 当前页面是否全屏
      maximize: false,
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: "vertical",
      // 默认 primary 主题颜色
      primary: DEFAULT_PRIMARY,
      // 深色模式
      isDark: false,
      // 灰色模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 折叠菜单
      isCollapse: false,
      // 面包屑导航
      breadcrumb: true,
      // 面包屑导航图标
      breadcrumbIcon: true,
      // 标签页
      tabs: true,
      // 标签页图标
      tabsIcon: true,
      // 页脚
      footer: true,
    });

    const setToken = (str: string) => {
      token.value = str;
      console.log(token, "token的值");
    };

    function changeIsCollapse() {
      isCollapse.value = !isCollapse.value;
      // 其实多此一举 就是看看好用不好用
      emitter.emit("changeSidebarCollapse", isCollapse.value);
      sessionStorage.setItem("Collapse", String(isCollapse.value));
    }

    function initIsCollapse() {
      const res = sessionStorage.getItem("Collapse");

      if (!res) {
        // 没取到 给初始值
        emitter.emit("changeSidebarCollapse", false);
        sessionStorage.setItem("Collapse", String(false));
        return ref(false);
      } else {
        // 取到了 广播出去
        const currentCollapse = JSON.parse(res);
        emitter.emit("changeSidebarCollapse", currentCollapse);
        return ref(currentCollapse);
      }
    }

    const addKeepAliveName = (name: string) => {
      !keepAliveName.value.includes(name) && keepAliveName.value.push(name);
    };

    const removeKeepAliveName = (name: string) => {
      keepAliveName.value = keepAliveName.value.filter((item) => item !== name);
    };

    const setKeepAliveName = (keepAliveNameList: string[] = []) => {
      keepAliveName.value = keepAliveNameList;
    };

    const setThemeConfig = (themeConfig: ThemeConfigProps) => {
      // console.log("set theme config", themeConfig);
      ThemeConfig.value = themeConfig;
    };

    // 设置element组件的大小
    const setAssemblySizeSize = (newAssemblySize: AssemblySizeType) => {
      assemblySize.value = newAssemblySize;
    };

    // 修改语言
    const changeLanguage = (newLang: string) => {
      language.value = newLang;
    };

    // 设置用户ID
    const setUserId = (id: string | number) => {
      userId.value = id;
    };

    /**
     * 刷新当前页面
     * @param routeName 路由名称
     */
    const refreshPage = (routeName: string) => {
      setTimeout(() => {
        removeKeepAliveName(routeName);
        emitter.emit("refreshCurrentPage", false);

        nextTick(() => {
          addKeepAliveName(routeName);
          emitter.emit("refreshCurrentPage", true);
        });
      }, 0);
    };

    return {
      token,
      isCollapse,
      keepAliveName,
      assemblySize,
      ThemeConfig,
      language,
      setUserId,
      changeIsCollapse,
      initIsCollapse,
      setToken,
      addKeepAliveName,
      removeKeepAliveName,
      setKeepAliveName,
      setThemeConfig,
      setAssemblySizeSize,
      changeLanguage,
      refreshPage,
    };
  },

  {
    // persist: true,
    persist: piniaPersistConfig("globalSetting"),
  }
);

export function useGlobalSettingStoreWithOut() {
  return useGlobalSettingStore(store);
}
