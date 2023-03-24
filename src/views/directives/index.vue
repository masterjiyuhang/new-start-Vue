<template>
  <div class="directives-page">
    <div class="base-card min-h-[150px]">
      自定义指令
      <h1 v-copy="data" class="cursor-pointer">{{ data }}</h1>
    </div>

    <div
      class="base-card min-h-[150px] mt-5"
      v-watermark="{
        text: 'cch-water-market',
        textColor: 'rgba(180, 180, 180, 0.4)',
      }"
    >
      <span>看看水印</span>
    </div>

    <div class="mt-5 base-card">
      <el-button v-throttle="handleThrottle">点击 throttle</el-button>
    </div>
    <div class="mt-5 base-card">
      <el-button
        v-debounce="{ delay: 500, immediate: true, func: handleDebounce }"
      >
        点击 立即执行 debounce
      </el-button>
      <el-button
        v-debounce="{ delay: 500, immediate: false, func: handleDebounce }"
      >
        点击 延迟执行 debounce
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";

const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");

const handleThrottle = () => {
  ElMessage.success("我是截流函数");
};
const handleDebounce = () => {
  ElMessage.success("我是防抖函数");
};
</script>

<style scoped></style>
