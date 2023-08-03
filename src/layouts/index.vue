<template>
  <div class="flex w-full h-full">
    <component :is="LayoutComponents[ThemeConfig.layout]" />
    <ThemeDrawer />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import { storeToRefs } from "pinia";

import LayoutVertical from "./LayoutVertical/index.vue";
import LayoutClassic from "./LayoutClassic/index.vue";
import LayoutTransverse from "./LayoutTransverse/index.vue";
import LayoutColumns from "./LayoutColumns/index.vue";

import type { Component } from "vue";

const LayoutComponents: { [key: string]: Component } = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns,
};

const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
</script>
