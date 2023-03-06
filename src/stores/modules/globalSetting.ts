import { ref } from "vue";
import { defineStore } from "pinia";
import { store } from "../index";
import { emitter } from "@/utils/mitt";

export const useGlobalSettingStore = defineStore("globalSetting", () => {
  const isCollapse = initIsCollapse();
  // const isCollapse = ref(
  //   sessionStorage.getItem("Collapse")
  //     ? Boolean(sessionStorage.getItem("Collapse"))
  //     : false
  // );
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

  return { isCollapse, changeIsCollapse, initIsCollapse };
});

export function useGlobalSettingStoreWithOut() {
  return useGlobalSettingStore(store);
}
