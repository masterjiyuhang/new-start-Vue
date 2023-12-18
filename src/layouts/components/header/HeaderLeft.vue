<template>
  <div class="header-left">
    <CollapseIcon />
    <Breadcrumb v-if="ThemeConfig.breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import Breadcrumb from "./components/Breadcrumb.vue";
import CollapseIcon from "./components/CollapseIcon.vue";
const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
</script>

<style scoped>
.header-left {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
