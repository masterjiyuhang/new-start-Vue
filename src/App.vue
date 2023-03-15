<script setup lang="ts">
import { RouterView } from "vue-router";
// import LogoSvg from "@/assets/logo.svg?component";
</script>

<template>
  <el-config-provider :size="'small'">
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
