<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAccountListApi } from "@/api/index";
import { ref } from "vue";

const list = ref<any>([]);
const getAccountList = async () => {
  const res = await getAccountListApi();
  list.value = res;
};

getAccountList();
</script>

<style scoped></style>
