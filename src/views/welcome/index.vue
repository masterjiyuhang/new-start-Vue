<template>
  <div class="h-full wrapper-page">
    <h1>welcome {{ counterStore.count }} times</h1>
    <el-button @click="counterStore.increment">count++</el-button>

    <el-button type="danger" @click="refresh">刷新当前页面</el-button>

    <el-button type="success" @click="testWeibo"> 重新获取表格数据 </el-button>

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      height="450"
      class="mt-7"
    >
      <el-table-column type="index" />
      <el-table-column prop="hot" label="Hot" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column label="Address Info">
        <el-table-column prop="url" label="Address">
          <template #default="scope">
            <div class="flex items-center">
              <el-link type="primary" class="ml-3" :href="scope.row.url"
                >Link</el-link
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Edit">
          <template #default="scope">
            <div class="flex items-center"></div>

            <el-button type="primary" @click="editRow(scope.row)">
              <el-icon> <View /> </el-icon>Detail
            </el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="50%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <iframe :src="currentIframeSrc" frameborder="0" class="w-full"></iframe>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/modules/count";
import { useScript } from "@/hooks/useScript";
import { onMounted, ref } from "vue";

import { getWeiboHotApi } from "@/api/external";
import { ElNotification } from "element-plus";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { useRoute } from "vue-router";

const counterStore = useCounterStore();

const globalSettingStore = useGlobalSettingStore();
const route = useRoute();
const refresh = () => globalSettingStore.refreshPage(route.name as string);

// 表格数据
function initTable() {
  // 表格加载中
  const loading = ref(false);

  const tableData = ref<{ hot: string; name: string; url: string }[]>([]);

  const dialogVisible = ref(false);
  const currentIframeSrc = ref("");

  const testWeibo = async () => {
    loading.value = true;
    const res = await getWeiboHotApi();
    tableData.value = res.data;
    loading.value = false;
  };

  const handleClose = (done: () => void) => {
    currentIframeSrc.value = "";
    done();
  };

  const editRow = (row: { name: string; url: string }) => {
    ElNotification.success(row.name);
    currentIframeSrc.value = row.url;
    dialogVisible.value = true;
  };

  onMounted(() => {});
  return {
    loading,
    tableData,
    dialogVisible,
    currentIframeSrc,
    handleClose,
    testWeibo,
    editRow,
  };
}

function initPage() {
  const { fetchDataByScript } = useScript("basic-api/system/testJSONP");

  const init = async () => {
    fetchDataByScript().catch(() => {});
  };

  onMounted(async () => {
    init();
  });
}

const {
  loading,
  tableData,
  dialogVisible,
  currentIframeSrc,
  handleClose,
  editRow,
  testWeibo,
} = initTable();

initPage();
</script>

<style scoped>
.welcome {
  width: 100%;
  height: 100%;
}
</style>
