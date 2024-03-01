<template>
  <div class="wrapper-page">
    <TimeClock />
    <HoneyComb />
    <Stitch />
  </div>
</template>

<script setup lang="ts">
import { HoneyComb } from "./HoneyComb/HoneyComb";
import { Stitch } from "./Stitch/Stitch";
import TimeClock from "./TimeClock/index.vue";
</script>

<style scoped></style>
