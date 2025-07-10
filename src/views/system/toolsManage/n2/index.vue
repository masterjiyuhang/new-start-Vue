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
import FileSelector from "./src/components/FileSelector.vue";
const tableData = ref<any[]>([]);
function showSuccess(data) {
  tableData.value.push(data);
  ElMessage.success("解锁成功");
}
function showFail() {}

function handleDownload(data) {
  DownloadBlobMusic(data);
}

function handleDownloadAll() {
  if (tableData.value.length > 0) {
    downloadNextFile(0);
  } else {
    ElMessage.warning("请先上传文件");
  }
}

function handleDel(e) {
  tableData.value.splice(e.$index, 1);
}

function downloadNextFile(index: number) {
  if (index < tableData.value.length) {
    const item = tableData.value[index];
    // 实现下载逻辑
    DownloadBlobMusic(item)
      .then(() => {
        // 下载成功后继续下载下一个文件
        downloadNextFile(index + 1);
      })
      .catch((error) => {
        // 处理下载失败的情况
        console.error("下载失败:", error);
        ElMessage.error(`下载文件 ${item.name} 失败`);
        // 继续尝试下载下一个文件
        downloadNextFile(index + 1);
      });
  }
}
</script>

<style scoped></style>
