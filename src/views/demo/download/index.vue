<template>
  <WrapperPage :title="'测试下载'">
    <el-card shadow="always">
      <template #header>
        <span>根据后台接口文件流下载</span>
      </template>
      <el-button type="primary" @click="handleDownByData">文件流下载</el-button>
    </el-card>

    <el-card shadow="always" class="mt-5">
      <template #header>
        <span>根据文件地址下载文件</span>
      </template>
      <el-button type="primary" @click="handleDownByUrl"
        >文件地址下载</el-button
      >
    </el-card>

    <el-card shadow="always" class="mt-5">
      <template #header>
        <span>base64流下载</span>
      </template>
      <el-button type="primary" @click="handleDownloadByBase64"
        >base64流下载</el-button
      >
    </el-card>

    <el-card shadow="always" class="mt-5">
      <template #header>
        <span>图片Url下载</span>
      </template>
      <el-button type="primary" @click="handleDownloadByOnlineUrl"
        >图片Url下载</el-button
      >
    </el-card>
  </WrapperPage>
</template>

<script setup lang="ts">
import { WrapperPage } from "@/components/WrapperPage";
import {
  downloadByData,
  downloadByUrl,
  downloadByOnlineUrl,
  downloadByBase64,
} from "@/utils/file/download";
import { imgBase64 } from "@/utils/file/constant";

defineOptions({
  name: "DownLoad",
});

/**
 * 文件流下载
 */
const handleDownByData = () => {
  downloadByData("text content", "testName.txt");
};

/**
 * 文件地址下载
 */
const handleDownByUrl = () => {
  downloadByUrl({
    url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    target: "_blank",
  });
};

/**
 * base64下载
 */
const handleDownloadByBase64 = () => {
  downloadByBase64(imgBase64, "downloadByBase64.png");
};

/**
 * 根据图片url下载
 */
const handleDownloadByOnlineUrl = () => {
  downloadByOnlineUrl(
    "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    "downloadByUrl.png"
  );
};
</script>

<style scoped></style>
