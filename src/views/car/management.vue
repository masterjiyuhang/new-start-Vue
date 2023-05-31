<template>
  <div class="wrapper-page">
    <el-button @click="getWeeklyData" class="mb-5" type="primary"
      >获取当日数据</el-button
    >
    <el-card class="box-card">
      <div v-for="(item, index) in baseData.weeklyData" :key="index">
        <div>
          <span>{{ index + 1 }}、</span> <span>{{ item.name }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getWeeklyDataApi } from "@/api/carManagement";
import { reactive } from "vue";

interface WeeklyDataItem {
  name: string;
  url: string;
}

const baseData = reactive({
  weeklyData: [] as WeeklyDataItem[],
});

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

async function getWeeklyData() {
  const res: any = await getWeeklyDataApi();
  console.log(res, "获取结果");
  baseData.weeklyData = shuffleArray(res?.data);
}
</script>

<style scoped></style>
