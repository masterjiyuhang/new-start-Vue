<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <span>This is userInfo</span>
    <br />
    <el-button type="primary" @click="viewUserDetail"
      >查看更多详细信息</el-button
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dialogVisible = ref(false);

// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};

const viewUserDetail = () => {
  router.push("/user/detail/" + "1");
  dialogVisible.value = false;
};
defineExpose({ openDialog });
</script>
