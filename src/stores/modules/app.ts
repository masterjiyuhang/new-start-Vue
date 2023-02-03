import { defineStore } from "pinia";
import type { appType } from "./types";
import { store } from "@/stores";

export const useAppStore = defineStore({
  id: "cch-app",
  state: (): appType => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
      isClickCollapse: false,
    },
  }),
  getters: {
    getSidebarStatus(): any {
      return this.sidebar.opened;
    },
  },
});
export function useAppStoreHook() {
  return useAppStore(store);
}
