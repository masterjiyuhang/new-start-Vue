<script setup lang="ts">
import { RouterView } from "vue-router";
// import LogoSvg from "@/assets/logo.svg?component";

import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { useTheme } from "@/hooks/useTheme";

const { initTheme } = useTheme();
const { assemblySize} = storeToRefs(useGlobalSettingStore());

initTheme();
</script>

<template>
  <el-config-provider :size="assemblySize">
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
