<template>
  <div class="wrapper-page">
    <h1 class="font-semibold">上传文件</h1>
    <FileSelector @error="showFail" @success="showSuccess" />

    <el-table :data="tableData" class="w-full">
      <el-table-column label="歌曲" prop="title"></el-table-column>
      <el-table-column label="歌手" prop="artist"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            circle
            icon="el-icon-download"
            @click="handleDownload(scope.row)"
          ></el-button>
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
</script>

<style scoped></style>
