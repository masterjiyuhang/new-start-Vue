<template>
  <div class="wrapper-page">s</div>
</template>

<script setup lang="ts">
import { getCarTypeListApi } from "@/api/car";

function getList() {
  getCarTypeListApi();
}

onMounted(() => {
  getList();
});
</script>

