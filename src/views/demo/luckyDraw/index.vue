<template>
  <wrapper-page :title="'抽奖'">
    <!-- <LuckyWheel /> -->
    <LuckyDraw />
  </wrapper-page>
</template>

<script setup lang="ts">
import { WrapperPage } from "@/components/WrapperPage";
import LuckyDraw from "./components/LuckyDraw.vue";

// import LuckyWheel from "./components/LuckyWheel.vue";
</script>

<style scoped></style>
