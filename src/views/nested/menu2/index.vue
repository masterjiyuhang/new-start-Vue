<template>
  <div>
    menu2

    <h2>
      {{ router }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped></style>
