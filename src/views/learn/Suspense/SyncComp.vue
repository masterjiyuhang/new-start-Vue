<template>
  <Transition mode="in-out">
    <div>
      <!-- <ul v-for="(item, index) in list" :key="index">
            <li>{{ item.id }} - {{ item.account }}</li>
          </ul> -->
      <h1>哈哈</h1>

      <div v-for="item in state.companyList" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { getCompanyListApi } from "@/api/index";
import { reactive } from "vue";

const state = reactive<any>({
  companyList: [] as any[],
});

const getCompanyList = async () => {
  const res: any = await getCompanyListApi();
  console.log(res, "company list");
  state.companyList = res.data;
};

getCompanyList();
</script>

<style scoped></style>
