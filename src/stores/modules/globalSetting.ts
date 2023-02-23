import { ref } from "vue";
import { defineStore } from "pinia";
import { store } from "../index";
import { emitter } from "@/utils/mitt";

export const useGlobalSettingStore = defineStore("globalSetting", () => {
  const isCollapse = ref(false);
  function changeIsCollapse() {
    isCollapse.value = !isCollapse.value;
    // 其实多此一举 就是看看好用不好用
    emitter.emit("changeSidebarCollapse", isCollapse.value);
  }

  function initIsCollapse() {
    
  }

  return { isCollapse, changeIsCollapse };
});

export function useGlobalSettingStoreWithOut() {
  return useGlobalSettingStore(store);
}
