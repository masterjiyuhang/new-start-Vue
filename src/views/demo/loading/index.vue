<template>
  <div class="wrapper-page">
    <div class="relative">
      <Loading :loading="isLoading" :absolute="isAbsolute" :tips="'加载中...'">
      </Loading>
      <div class="bg-yellow-400 w-full h-[130px]"></div>
      <el-button @click="handleShowLoading(true)">看看实力 容器内</el-button>
      <el-button @click="handleShowLoading(false)">看看实力 全屏幕</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Loading from "./src/Loading.vue";

const isLoading = ref(false);
const isAbsolute = ref(false);

const handleShowLoading = (flag) => {
  isAbsolute.value = flag;
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
};
</script>

<style scoped></style>
