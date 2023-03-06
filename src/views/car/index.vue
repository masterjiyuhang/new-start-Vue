<template>
  <div>
    car

    <el-button @click="handleSayHi" type="primary">sayHi</el-button>
    <el-button @click="handleSayHi" type="danger">sayHi</el-button>
    <el-button @click="handleSayHi">sayHi</el-button>
  </div>
</template>

<script lang="ts" setup >
import { ElNotification } from "element-plus";

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
</script>

<style lang="scss" scoped></style>
