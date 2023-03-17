<template>
  <div class="h-full w-full flex">
    <component :is="LayoutComponents[ThemeConfig.layout]" />
    <ThemeDrawer />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";

import LayoutVertical from "./LayoutVertical/index.vue";
// import LayoutClassic from "./LayoutClassic/index.vue";
// import LayoutTransverse from "./LayoutTransverse/index.vue";
// import LayoutColumns from "./LayoutColumns/index.vue";
import type { Component } from "vue";

const LayoutComponents: { [key: string]: Component } = {
  vertical: LayoutVertical,
  //   classic: LayoutClassic,
  //   transverse: LayoutTransverse,
  //   columns: LayoutColumns,
};

const { ThemeConfig } = useGlobalSettingStore();
</script>

<style scoped></style>
