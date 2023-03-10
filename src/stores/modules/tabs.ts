import { constantMenus } from "@/router";
import { store } from "@/stores";
import { defineStore } from "pinia";

export const useMultiTagsStore = defineStore({
  id: "multiTags",
  state: () => ({
    multiTagList: [...constantMenus],
  }),
  getters: {
    getMultiTagList(state) {
      return state.multiTagList;
    },
  },
  actions: {},
});

export function useMultiTagsStoreWithOut() {
  return useMultiTagsStore(store);
}
