<template>
  <div class="wrapper-page">
    car list
    <el-button @click="handleSayHi" type="primary">sayHi</el-button>
    <el-button @click="handleSayHi" type="danger">sayHi</el-button>
    <el-button @click="handleSayHi">sayHi</el-button>
    <el-button @click="getList">get company list</el-button>
    <el-button @click="testGetWeiboHostListApi">get weibo list</el-button>

    <div v-for="(item, index) in rr" :key="index">
      {{ item }}
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="220" />
      <el-table-column prop="state" label="State" width="220" />
      <el-table-column prop="city" label="City" width="220" />
      <el-table-column prop="address" label="Address" width="300" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope.row)"
            >Detail</el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <cch-table />

    <cch-dialog :visible="true" />
  </div>
</template>

<script lang="ts" setup>
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getWeiboHostListApi, getTestListApi } from "@/api/baseTest";

onMounted(async () => {});

let rr = ref();

const testGetWeiboHostListApi = async () => await getWeiboHostListApi();
const getList = async () => {
  try {
    const res = await getTestListApi();
    rr.value = res;
  } catch (error) {
    console.log(error);
  }
};
const router = useRouter();
const handleSayHi = () => {
  ElNotification({
    title: "Notification Title",
    message: "Hi~ ",
    duration: 0,
  });
};

const handleClick = (e) => {
  router.push({
    name: "carDetail",
    params: {
      ...e,
    },
  });
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
    id: "1",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
    id: "2",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
    id: "3",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
    id: "4",
  },
];
</script>

<style lang="scss" scoped></style>
