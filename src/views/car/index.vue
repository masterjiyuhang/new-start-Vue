<template>
  <div class="wrapper-page">
    car list
    <el-button @click="handleSayHi" type="primary">sayHi</el-button>
    <el-button @click="handleSayHi" type="danger">sayHi</el-button>
    <el-button @click="handleSayHi">sayHi</el-button>

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

    <el-button @click="getList">get list</el-button>
  </div>
</template>

<script lang="ts" setup>
import { getCarListApi } from "@/api/car";
import { ElNotification } from "element-plus";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getWeiboHostListApi } from "@/api/test";

onMounted(async () => {
  const res = await getCarListApi();
  console.log(res);
});

const getList = async () => {
  try {
    const res = await getWeiboHostListApi();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
const router = useRouter();
const handleSayHi = () => {
  // ElNotification({
  //   title: "Success",
  //   message: "This is a success message",
  //   type: "success",
  // });
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
