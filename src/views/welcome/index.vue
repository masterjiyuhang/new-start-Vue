<template>
  <div class="welcome">
    welcome {{ count }}
    <el-button @click="increment">count++</el-button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/modules/count";

const { count, increment } = useCounterStore();
</script>

<style scoped>
.welcome {
  height: 100%;
}
</style>
