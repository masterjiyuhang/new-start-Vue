<template>
  <div class="welcome">welcome</div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
console.log(router);
console.log(route);
</script>

<style scoped>
.welcome {
  height: 100%;
}
</style>
