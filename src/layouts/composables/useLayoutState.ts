import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { AuthStore } from "@/stores/modules/auth";

export function useLayoutState() {
  const { ThemeConfig, isCollapse } = storeToRefs(useGlobalSettingStore());
  const authStore = AuthStore();
  const menuList = computed(() => authStore.showMenuListGet);

  return { ThemeConfig, isCollapse, menuList };
}
