import { ref } from "vue";
import { defineStore } from "pinia";
import { store } from "../index";

export const useGlobalSettingStore = defineStore("globalSetting", () => {
  const isCollapse = ref(false);
  function changeIsCollapse() {
    isCollapse.value = !isCollapse.value;
    console.log("执行", isCollapse.value);
  }

  return { isCollapse, changeIsCollapse };
});

export function useGlobalSettingStoreWithOut() {
  return useGlobalSettingStore(store);
}
