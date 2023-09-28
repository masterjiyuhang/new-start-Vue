<template>
  <div class="wrapper-page">
    <div>
      <Demo1 />

      <GridDemo1 />
      <GridDemo2 />

      <BoxShadowDemo />

      <ShadowDemo2 />
      <ShadowDemo3 />

      <FlowerShadow />
    </div>
  </div>
</template>

<script setup lang="ts">
import Demo1 from "./src/index";
import GridDemo1 from "./src/GridLayoutDemo/GridDemo1.vue";
import GridDemo2 from "./src/GridLayoutDemo/GridDemo2.vue";
import BoxShadowDemo from "./src/BoxShadowDemo/index.vue";
import ShadowDemo2 from "./src/BoxShadowDemo/ShadowDemo2.vue";
import ShadowDemo3 from "./src/BoxShadowDemo/ShadowDemo3.vue";
import FlowerShadow from "@/components/FlowerShadow/index.vue";
</script>

<style scoped></style>
