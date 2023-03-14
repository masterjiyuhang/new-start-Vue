<template>
  <div>
    <ul v-for="(item, index) in list" :key="index">
      <li>{{ item.id }} - {{ item.account }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getAccountListApi } from "@/api/index";
import { ref } from "vue";

const list = ref<any>([]);
const getAccountList = async () => {
  const res: any = await getAccountListApi();
  console.log(res, "ress");
  list.value = res?.result.items;
};

getAccountList();
</script>

<style scoped></style>
