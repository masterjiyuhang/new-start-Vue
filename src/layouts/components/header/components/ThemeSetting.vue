<template>
  <div class="theme-setting">
    <IconTheme @click="openDrawer" class="cursor-pointer toolBar-icon"/>
  </div>
</template>

<script setup lang="ts">
import IconTheme from "@/components/icons/IconTheme.vue";
import { emitter } from "@/utils/mitt";
const openDrawer = () => {
  emitter.emit("openThemeDrawer");
};
</script>

<style scoped></style>
