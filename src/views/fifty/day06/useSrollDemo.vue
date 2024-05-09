<script setup lang="ts">
import { computed, ref } from "vue";
import { useScroll } from "@vueuse/core";

const el = ref<HTMLElement | null>(null);
const { x, y } = useScroll(el);
console.log(el.value);
// Format the numbers with toFixed() to make them
// nicer to display
const displayX = computed({
  get() {
    return x.value.toFixed(1);
  },
  set(val) {
    x.value = Number.parseFloat(val);
  },
});
const displayY = computed({
  get() {
    return y.value.toFixed(1);
  },
  set(val) {
    y.value = Number.parseFloat(val);
  },
});
</script>

<template>
  <div class="flex">
    <div
      ref="el"
      class="m-auto overflow-scroll rounded w-[300px] h-[300px] bg-gray-500/5"
    >
      <div class="relative w-[500px] h-[400px]">
        <div class="absolute top-0 left-0 px-2 py-1 bg-gray-500">TopLeft</div>
        <div class="absolute bottom-0 left-0 px-2 py-1 bg-gray-500">
          BottomLeft
        </div>
        <div class="absolute top-0 right-0 px-2 py-1 bg-gray-500">TopRight</div>
        <div class="absolute bottom-0 right-0 px-2 py-1 bg-gray-500">
          BottomRight
        </div>
        <div class="absolute px-2 py-1 bg-gray-500 left-1/3 top-1/3">
          Scroll Me
        </div>
      </div>
    </div>
    <div class="pl-4 m-auto w-[280px]">
      <div
        class="px-6 py-4 rounded grid grid-cols-[120px_auto] gap-2 bg-gray-500/5"
      >
        <span class="py-4 text-right opacity-65">X Position</span>
        <div class="text-purple-400">
          <div>
            <input
              v-model="displayX"
              type="number"
              min="0"
              max="200"
              step="10"
              class="px-2 py-2 text-2xl w-full !min-w-0 block rounded border-s bg-cyan-300"
            />
          </div>
        </div>
        <span class="py-4 text-right opacity-65">Y Position</span>
        <div class="text-purple-400">
          <div>
            <input
              v-model="displayY"
              type="number"
              min="0"
              max="100"
              step="10"
              class="px-2 py-2 text-2xl w-full !min-w-0 block rounded border-s bg-cyan-300"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
