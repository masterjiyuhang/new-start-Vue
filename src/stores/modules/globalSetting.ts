import { nextTick, ref } from "vue";
import { defineStore } from "pinia";
import { store } from "../index";
import { emitter } from "@/utils/mitt";
import { DEFAULT_PRIMARY } from "@/config";
import { AssemblySizeType, ThemeConfigProps } from "../interface";
import { piniaPersistConfig } from "../storePlugin";

export const useGlobalSettingStore = defineStore(
  "globalSetting",
  () => {
    const isCollapse = initIsCollapse();

    const token = ref<string | null>("");

    const refreshToken = ref<string | null>("");

    const userId = ref<string | number>("");

    const assemblySize = ref<string>("default");

    const keepAliveName = ref<string[]>([]);

    const language = ref<string>("en");

    const ThemeConfig = ref<ThemeConfigProps>({
      maximize: false,
      layout: "vertical",
      primary: DEFAULT_PRIMARY,
      isDark: false,
      isGrey: false,
      isWeak: false,
      isCollapse: false,
      breadcrumb: true,
      breadcrumbIcon: true,
      tabs: true,
      tabsIcon: true,
      footer: true,
    });

    const setToken = (str: string) => {
      token.value = str;
    };

    function changeIsCollapse() {
      isCollapse.value = !isCollapse.value;
      emitter.emit("changeSidebarCollapse", isCollapse.value);
      sessionStorage.setItem("Collapse", String(isCollapse.value));
    }

    function initIsCollapse() {
      const res = sessionStorage.getItem("Collapse");

      if (!res) {
        emitter.emit("changeSidebarCollapse", false);
        sessionStorage.setItem("Collapse", String(false));
        return ref(false);
      } else {
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
      ThemeConfig.value = themeConfig;
    };

    const setAssemblySizeSize = (newAssemblySize: AssemblySizeType) => {
      assemblySize.value = newAssemblySize;
    };

    const changeLanguage = (newLang: string) => {
      language.value = newLang;
    };

    const setUserId = (id: string | number) => {
      userId.value = id;
    };

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
      refreshToken,
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
    persist: piniaPersistConfig("globalSetting"),
  },
);

export function useGlobalSettingStoreWithOut() {
  return useGlobalSettingStore(store);
}
