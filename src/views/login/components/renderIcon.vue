<template>
  <el-icon>
    <component :is="name" />
  </el-icon>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}
defineProps<Props>();
</script>

<style scoped></style>
