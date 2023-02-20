<template>
  <div class="cch-content">
    <Tabs />
    <div class="cch-content__wrapper">
      <transition name="fade" mode="out-in">
        <router-view :key="route.fullPath" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Tabs from "./Tabs.vue";

const route = useRoute();

console.log(route, "route");
</script>

<style scoped></style>
