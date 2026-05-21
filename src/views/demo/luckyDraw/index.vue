<template>
  <wrapper-page :title="'抽奖'">
    <LuckyDraw />
  </wrapper-page>
</template>

<script setup lang="ts">
import { WrapperPage } from "@/components/WrapperPage";
import LuckyDraw from "./components/LuckyDraw.vue";
</script>
