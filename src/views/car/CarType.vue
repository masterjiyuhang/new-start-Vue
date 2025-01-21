<template>
  <div class="wrapper-page">s</div>
</template>

<script setup lang="ts">
import { getCarTypeList } from "@/api/car";

function getList() {
  getCarTypeList().then((res) => {
    console.log(res);
  });
}

onMounted(() => {
  getList();
});
</script>

<style scoped></style>
