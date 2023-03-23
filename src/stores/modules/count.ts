import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { store } from "../index";
import { piniaPersistConfig } from "../storePlugin";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    function increment() {
      count.value++;

      console.log("新的count值", count.value);
    }

    return { count, doubleCount, increment };
  },
  {
    persist: piniaPersistConfig("counter"),
  }
);

export function useCounterStoreWithOut() {
  return useCounterStore(store);
}
