<template>
  <div class="welcome">
    welcome {{ count }}
    <el-button @click="increment">count++</el-button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/modules/count";
import { storeToRefs } from "pinia";

const { increment } = useCounterStore();
const { count } = storeToRefs(useCounterStore());
</script>

<style scoped>
.welcome {
  height: 100%;
}
</style>
