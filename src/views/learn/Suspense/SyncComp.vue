<template>
  <div>
    <el-button @click="visible = !visible">change visible</el-button>
    <Transition mode="in-out">
      <div v-if="visible">
        <h1>哈哈</h1>
        <div v-for="item in state.companyList" :key="item.id">
          {{ item.name }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { getCompanyListApi } from "@/api/mock";
import { reactive, ref } from "vue";

const state = reactive<any>({
  companyList: [] as any[],
});
const rr = await getCompanyListApi();
state.companyList = rr.data;
// const getCompanyList = async () => {
//   const res: any = await getCompanyListApi();
//   console.log(res, "company list");
//   state.companyList = res.data;
// };

// getCompanyList();

const visible = ref(true);
</script>

<style scoped></style>
