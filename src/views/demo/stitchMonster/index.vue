<template>
  <div class="wrapper-page">
    <TimeClock />
    <HoneyComb />
    <Pendulum />
  </div>
</template>

<script setup lang="ts">
import { HoneyComb } from "./HoneyComb/HoneyComb";
import TimeClock from "./TimeClock/index.vue";
import { Pendulum } from "./Pendulum/Index";
</script>
