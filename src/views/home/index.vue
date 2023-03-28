<template>
  <div class="home-page">
    <img :src="welcome" class="home-img" />
  </div>
</template>

<script setup lang="ts">
import welcome from "@/assets/system/HalloweenIllustrations2.png";
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  align-items: center;
  justify-content: center;

  .home-img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
