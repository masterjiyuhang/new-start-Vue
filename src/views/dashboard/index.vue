<template>
  <div>dashboard</div>
</template>

<script lang="ts">
export default {
  name: "Dashboard",
};
</script>

<script lang="ts" setup>
import { getAccountListApi } from "@/api/index";
import { onMounted } from "vue";

const getAccountList = async () => {
  const res = await getAccountListApi();
  console.log(res);
};

onMounted(() => {
  getAccountList();
});
</script>

<style lang="scss" scoped></style>
