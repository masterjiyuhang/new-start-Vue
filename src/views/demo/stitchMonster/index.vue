<template>
  <div class="wrapper-page">
    <TimeClock />
    <HoneyComb />
    <Pendulum />
    <!-- <Stitch /> -->
  </div>
</template>

<script setup lang="ts">
import { HoneyComb } from "./HoneyComb/HoneyComb";
// import { Stitch } from "./Stitch/Stitch";
import TimeClock from "./TimeClock/index.vue";

import { Pendulum } from "./Pendulum/Index";
</script>

<style scoped></style>
