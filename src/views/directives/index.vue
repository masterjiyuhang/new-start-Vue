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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");
</script>

<style scoped></style>
