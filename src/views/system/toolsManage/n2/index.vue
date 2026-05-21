<template>
  <div class="wrapper-page">
    <h1 class="font-semibold">上传文件</h1>
    <FileSelector @error="showFail" @success="showSuccess" />
    <el-button @click="handleDownloadAll" type="primary" class="my-3"
      >下载全部</el-button
    >
    <el-table :data="tableData" class="w-full">
      <el-table-column label="歌曲" prop="title"></el-table-column>
      <el-table-column label="歌手" prop="artist"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button icon="el-icon-download" @click="handleDownload(scope.row)"
            >下载</el-button
          >
          <el-button @click="handleDel(scope)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { DownloadBlobMusic } from "@/utils/decrypt/utils";
import type { DecryptResult } from "@/utils/decrypt/entity";
import FileSelector from "./src/components/FileSelector.vue";

const tableData = ref<DecryptResult[]>([]);
function showSuccess(data: DecryptResult) {
  tableData.value.push(data);
  ElMessage.success("解锁成功");
}
function showFail() {}

function handleDownload(data: DecryptResult) {
  DownloadBlobMusic(data);
}

function handleDownloadAll() {
  if (tableData.value.length > 0) {
    downloadNextFile(0);
  } else {
    ElMessage.warning("请先上传文件");
  }
}

function handleDel(e: { $index: number }) {
  tableData.value.splice(e.$index, 1);
}

function downloadNextFile(index: number) {
  if (index < tableData.value.length) {
    const item = tableData.value[index];
    DownloadBlobMusic(item)
      .then(() => {
        downloadNextFile(index + 1);
      })
      .catch(() => {
        ElMessage.error(`下载文件 ${item.title} 失败`);
        downloadNextFile(index + 1);
      });
  }
}
</script>

