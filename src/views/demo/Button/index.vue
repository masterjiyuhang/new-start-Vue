<template>
  <div class="flex flex-wrap wrapper-page">
    <ShakeButton :msg="'抖动按钮'" />
    <ShineButton class="ml-5" />
  </div>
</template>

<script setup lang="ts">
import ShakeButton from "./src/ShakeButton";
import ShineButton from "./src/ShineButton/index.vue";
</script>

<style scoped></style>
