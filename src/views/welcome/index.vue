<template>
  <div class="welcome wrapper-page">
    welcome {{ count }}
    <el-button @click="increment">count++</el-button>

    <el-table :data="tableData" border style="width: 100%" height="450">
      <el-table-column type="index" />
      <el-table-column prop="hot" label="Hot" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column label="Address Info">
        <el-table-column prop="url" label="Address">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><View /></el-icon>
              <el-link
                type="primary"
                style="margin-left: 10px"
                :href="scope.row.url"
                >View</el-link
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Edit">
          <template #default="scope">
            <div style="display: flex; align-items: center"></div>
            <el-button type="primary" @click="editRow(scope.row)"
              >Edit</el-button
            >
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/modules/count";
import { storeToRefs } from "pinia";
import { useScript } from "@/hooks/useScript";
import { onMounted, ref } from "vue";

import { getWeiboApi } from "@/api/car";
import { ElNotification } from "element-plus";

const BAI_DU_MAP_URL = "https://tenapi.cn/v2/weibohot";
// "https://api.map.baidu.com/getscript?v=3.0&ak=OaBvYmKX3pjF7YFUFeeBCeGdy9Zp7xB2&services=&t=20210201100830&s=1";

const { getJsonpData } = useScript({
  url: BAI_DU_MAP_URL ?? "basic-api/system/getAccountList",
});

const tableData = ref([]);
const testWeibo = async () => {
  const res = await getWeiboApi();
  console.log(res);
  tableData.value = res.data;
};

const init = async () => {
  const res = getJsonpData();
  res
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("welcome page start initializing..");
};

const editRow = (row) => {
  console.log(row);
  ElNotification.success(row.name);
};
onMounted(async () => {
  testWeibo();
  init();
});
const { increment } = useCounterStore();
const { count } = storeToRefs(useCounterStore());
</script>

<style scoped>
.welcome {
  height: 100%;
}
</style>
