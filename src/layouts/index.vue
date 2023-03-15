<template>
  <component :is="LayoutComponents[ThemeConfig.layout]" />
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
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
