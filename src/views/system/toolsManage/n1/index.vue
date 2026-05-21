<template>
  <div class="wrapper-page">
    <h1>flac → mp3 转换器</h1>

    <!-- 上传区域 -->
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      :auto-upload="false"
      multiple
      drag
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="5"
      :on-exceed="handleExceed"
      :on-change="handleChangeFile"
      accept=".flac"
    >
      <el-button type="primary">点击或拖拽上传 FLAC 文件</el-button>
      <template #tip>
        <div class="el-upload__tip">最多可上传 5 个 FLAC，支持拖拽</div>
      </template>
    </el-upload>

    <!-- 转换按钮 -->
    <el-button
      type="success"
      :disabled="!fileList.length || converting"
      class="mt-4"
      @click="startConvert"
    >
      {{ converting ? "转换中..." : "开始转换" }}
    </el-button>

    <!-- 转换进度 & 下载 -->
    <div v-if="tasks.length" class="mt-6">
      <el-card v-for="task in tasks" :key="task.uid" class="mb-4">
        <div class="flex justify-between items-center">
          <div>
            <strong>{{ task.name }}</strong>
            <span v-if="task.status === 'done'" class="ml-2 text-green-600"
              >(完成)</span
            >
            <span v-else-if="task.status === 'error'" class="ml-2 text-red-600"
              >(失败)</span
            >
          </div>
          <div>
            <!-- 下载按钮 -->
            <el-button
              v-if="task.status === 'done'"
              size="small"
              @click="download(task)"
            >
              下载 MP3
            </el-button>
          </div>
        </div>
        <!-- 进度条 -->
        <el-progress
          v-if="task.status === 'processing'"
          :text-inside="true"
          :stroke-width="18"
          :percentage="task.progress"
          class="mt-2"
        />
        <!-- 错误信息 -->
        <div v-if="task.status === 'error'" class="mt-2 text-red-500">
          {{ task.error }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadUserFile, UploadProps } from "element-plus";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

interface Task {
  uid: string;
  name: string;
  status: "ready" | "processing" | "done" | "error";
  progress: number;
  blobUrl?: string;
  error?: string;
}

const fileList = ref<UploadUserFile[]>([]);
const tasks = reactive<Task[]>([]);
const converting = ref(false);

// 上传回调
const handleRemove: UploadProps["onRemove"] = (file) => {
  // 同步任务列表
  const idx = tasks.findIndex((t) => t.uid + "" === file.uid + "");
  if (idx !== -1) tasks.splice(idx, 1);
};
const beforeRemove: UploadProps["beforeRemove"] = (file) => {
  return ElMessageBox.confirm(`确定要移除 ${file.name} 吗？`)
    .then(() => true)
    .catch(() => false);
};
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `限制 5 个文件，本次共选了 ${files.length} 个，已有 ${uploadFiles.length} 个`,
  );
};
const handleChangeFile: UploadProps["onChange"] = (file) => {
  // 新增 task
  tasks.push({
    uid: file.uid + "",
    name: file.name,
    status: "ready",
    progress: 0,
  });
};

const message = ref("Click to Start ");

const sanitizeFilename = (name: string) => {
  return name.replace(/[^\w.-]/g, "_");
};

// 准备 ffmpeg
const ffmpeg = createFFmpeg({
  log: true,
});

// 修改startConvert函数中的核心部分
async function startConvert() {
  if (!fileList.value.length) {
    ElMessage.warning("请先上传 FLAC 文件");
    return;
  }

  converting.value = true;

  message.value = "Loading ffmpeg-core.js";
  ffmpeg.setLogger(({ message: msg }) => {
    message.value = msg;
  });

  await ffmpeg.load();
  message.value = "Start transcoding";
  // 注册进度回调
  ffmpeg.setProgress(({ ratio }: { ratio: number }) => {
    const t = tasks.find((t) => t.status === "processing");
    if (t) t.progress = Math.floor(ratio * 100);
  });

  for (const file of fileList.value) {
    const task = tasks.find((t) => t.uid + "" === file.uid + "")!;
    task.status = "processing";
    task.progress = 0;

    try {
      // 1. 清理文件名
      const cleanInputName = sanitizeFilename(file.name);
      const outputName = cleanInputName.replace(/\.flac$/i, ".mp3");

      // 2. 写入清理后的文件名
      const data = await fetchFile(file.raw as Blob);
      await ffmpeg.FS("writeFile", cleanInputName, data);

      // 3. 修正FFmpeg命令（使用数组参数更可靠）
      await ffmpeg.run("-i", cleanInputName, "-b:a", "192k", outputName);

      // 4. 确认文件存在再读取
      const files = ffmpeg.FS("readdir", "/");
      if (!files.some((item) => item === outputName)) {
        throw new Error(`输出文件未生成: ${outputName}`);
      }

      // 5. 使用正确的输出名读取
      const output = ffmpeg.FS("readFile", outputName);
      const blob = new Blob([output.buffer as ArrayBuffer], { type: "audio/mpeg" });
      task.blobUrl = URL.createObjectURL(blob);
      task.status = "done";
      task.progress = 100;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "转换失败";
      task.status = "error";
      task.error = message;
      if (message.includes("Permission denied")) {
        task.error = "文件权限错误";
      } else if (message.includes("No such file")) {
        task.error = "文件未找到";
      }
    }
  }

  converting.value = false;
}

// 点击下载
function download(task: Task) {
  if (!task.blobUrl) return;
  const a = document.createElement("a");
  a.href = task.blobUrl;
  a.download = task.name.replace(/\.flac$/i, ".mp3");
  a.click();
}
</script>

<style scoped>
.upload-demo {
  width: 100%;
}
</style>
