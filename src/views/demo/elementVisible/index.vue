<template>
  <div class="relative wrapper-page">
    <div class="min-h-screen">
      <h1 class="mb-12">Info on the right bottom corner</h1>
      <div
        ref="el"
        class="relative z-50 p-1 bg-white border-4 border-dashed shadow-lg border-sky-400 max-w-32 area dark:bg-gray-800"
      >
        Target Element (scroll down)
      </div>
    </div>
    <div class="fixed bottom-0 right-0 m-3 text-2xl shadow-lg">
      Element
      <BooleanDisplay
        :value="isVisible"
        true="inside"
        false="outside"
        class="font-bold"
      />
      the viewport
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";

const el = ref(null);
const isVisible = useElementVisibility(el);
</script>

<style scoped></style>
