<template>
  <div class="welcome">welcome {{ count }}</div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/modules/count";

const { count } = useCounterStore();
</script>

<style scoped>
.welcome {
  height: 100%;
}
</style>
