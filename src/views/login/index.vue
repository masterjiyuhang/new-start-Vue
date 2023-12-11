<template>
  <div>
    login page
    {{ name }}
  </div>
</template>

<script setup lang="ts">
const name = ref("");

name.value = "qw";

name = "";
</script>

<style scoped></style>
