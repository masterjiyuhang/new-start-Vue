<template>
  <div class="cch-dashboard">
    <h1>dashboard page</h1>
    <h2>{{ $t("home.title") }}</h2>

    <div v-for="item in accountList" :key="item.id">
      <span>account: {{ item.account }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Dashboard",
};
</script>

<script lang="ts" setup>
import { getAccountListApi } from "@/api/index";
import { onMounted, ref } from "vue";

const accountList = ref<any[]>([]);

const getAccountList = async () => {
  const { data } = await getAccountListApi();
  accountList.value = data.items;
};

onMounted(() => {
  getAccountList();
});
</script>

<style lang="scss" scoped>
@include cch.b(dashboard) {
  background-color: #ffa;
  min-height: 80vh;
}
</style>
