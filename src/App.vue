<script setup lang="ts">
import { RouterView } from "vue-router";

import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { useTheme } from "@/hooks/useTheme";

const { initTheme } = useTheme();
const globalSetting = useGlobalSettingStore();

initTheme();
</script>

<template>
  <el-config-provider :size="globalSetting.assemblySize">
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss" scoped>
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.wrapper {
  @include clearfix;

  position: relative;
  width: 100%;
  height: 100%;
}
</style>
