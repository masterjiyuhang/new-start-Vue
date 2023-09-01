<template>
  <div class="wrapper-page">
    css demo
    <Demo1 />

    <GridDemo1 />
    <GridDemo2 />

    <BoxShadowDemo />
  </div>
</template>

<script setup lang="ts">
import Demo1 from "./src/index";
import GridDemo1 from "./src/GridLayoutDemo/GridDemo1.vue";
import GridDemo2 from "./src/GridLayoutDemo/GridDemo2.vue";
import BoxShadowDemo from "./src/BoxShadowDemo/index.vue";
</script>

<style scoped></style>
