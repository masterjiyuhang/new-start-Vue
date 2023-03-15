import { defineStore } from "pinia";
import { piniaPersistConfig } from "../storePlugin";

export const useTestStore = defineStore("test", {
  state: () => ({ count: 0, name: "纪宇航" }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    changeName(str: string) {
      this.name = str;
    },
  },
  persist: piniaPersistConfig("test"),
});
