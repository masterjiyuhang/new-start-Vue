<template>
  <div class="header-left">
    <CollapseIcon />
    <Breadcrumb />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./components/Breadcrumb.vue";
import CollapseIcon from "./components/CollapseIcon.vue";
</script>

<style scoped>
.header-left {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
