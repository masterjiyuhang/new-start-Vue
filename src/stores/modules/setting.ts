import { defineStore } from "pinia";
import { store } from "..";

export const useSettingStore = defineStore({
  id: "setting",
  state: () => ({
    isCollapse: true,
    countCCH: 10,
  }),
  getters: {
    getIsCollapse(): boolean {
      return this.isCollapse;
    },
    getCollapse: (state) => state.isCollapse,
    doubleCountCCH: (state) => state.countCCH * 2,
  },
  actions: {
    changeCollapse() {
      console.log("change action");
      this.isCollapse = !this.isCollapse;
    },
  },
});

// Need to be used outside the setup
export function useSettingStoresWithOut() {
  return useSettingStore(store);
}
