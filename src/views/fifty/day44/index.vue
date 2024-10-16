<template>
  <div class="wrapper-page">
    <h1 class="font-semibold">上传文件</h1>
    <FileSelector @error="showFail" @success="showSuccess" />
    <el-button icon="el-icon-download" plain @click="handleDownloadAll"
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
  console.log("🚀 ~ file: index.vue:12 ~ showSuccess ~ data:", data);
  tableData.value.push(data);
  ElMessage.success("解锁成功");
}
function showFail() {}

function handleDownload(data) {
  DownloadBlobMusic(data);
}

function handleDownloadAll() {
  if (tableData.value.length > 0) {
    // tableData.value.forEach((item, index) => {
    downloadNextFile(0);
    // let c = setInterval(() => {
    //   if (index < tableData.value.length) {
    //     console.log(
    //       "🚀 ~ file: index.vue:39 ~ tableData.value.forEach ~ item:",
    //       item,
    //     );
    //     // DownloadBlobMusic(item);
    //   } else {
    //     clearInterval(c);
    //   }
    // }, 300);
    // });
  } else {
    ElMessage.warning("请先上传文件");
  }
}

function downloadNextFile(index: number) {
  // throw new Error("Function not implemented.");
  if (index < tableData.value.length) {
    const item = tableData.value[index];
    console.log(
      "🚀 ~ file: index.vue:40 ~ downloadNextFile ~ item, index:",
      item,
      index,
    );
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
