<template>
  <div>Tabs</div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { onMounted } from "vue";

onMounted(() => {
  emitter.on("changeSidebarCollapse", (value) => {
    console.log(value, "Tabs 中监听菜单是否折叠");
  });
});
</script>

<style scoped></style>
