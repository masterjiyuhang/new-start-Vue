<template>
  <div>Tabs</div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { onMounted } from "vue";

onMounted(() => {
  emitter.on("changeSidebarCollapse", (value) => {
    console.log("Tabs中监听菜单是否折叠", value);
  });
});
</script>

<style scoped></style>
