<template>
  <el-upload
    :auto-upload="false"
    :on-change="addFile"
    :show-file-list="false"
    action=""
    drag
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="text-center el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
      <div class="text-center">
        <h1 class="text-[#f80]">
          工作模式： {{ parallel ? "多线程 Worker" : "单线程 Queue" }}
        </h1>
        <el-tooltip effect="dark" placement="top-start">
          <div slot="content">
            将此工具部署在HTTPS环境下，可以启用Web Worker特性，<br />
            从而更快的利用并行处理完成解锁。
          </div>
          <i class="el-icon-info" style="font-size: 12px" />
        </el-tooltip>
      </div>
    </template>
    <transition name="el-fade-in">
      <el-progress
        v-show="progressShow"
        :format="progressString"
        :percentage="progressValue"
        :text-inside="true"
        class="m-3"
        :stroke-width="16"
      ></el-progress>
    </transition>
  </el-upload>
</template>

<script setup lang="ts">
import { Decrypt } from "@/utils/decrypt";
import { DecryptQueue } from "@/utils/decrypt/utils";
import { storage } from "@/utils/storage";
import { UploadFilled } from "@element-plus/icons-vue";

const task_all = ref(0);
const task_finished = ref(0);
const queue = ref(new DecryptQueue());
const parallel = ref(false);

const progressShow = computed(() => task_all.value !== task_finished.value);
const progressValue = computed(() =>
  task_all.value ? (task_finished.value / task_all.value) * 100 : 0,
);
const progressString = () => task_finished + "/" + task_all.value;

const emit = defineEmits(["success", "error"]);
async function addFile(file) {
  task_all.value++;
  queue.value.queue(async (dec = Decrypt) => {
    console.log(`start handling ${file.name}`, file);
    try {
      emit("success", await dec(file, await storage.getAll()));
    } catch (error) {
      emit("error", error, file.name);
    } finally {
      task_finished.value++;
    }
  });
}
</script>

<style scoped></style>
