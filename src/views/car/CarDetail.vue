<template>
  <div>
    car detail

    <el-button type="primary" @click="handleCloseCurrentPage">
      关闭当前页面
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";

// 关闭当前页 触发tabs里面的关闭
const handleCloseCurrentPage = () => {
  emitter.emit("closeThisPage", true);
};
</script>

<style scoped></style>
