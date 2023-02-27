<template>
  <div class="flex-bc">
    <div class="flex-bc">
      <el-icon @click="handleChangeCollapse">
        <Expand v-if="isCollapse" />
        <Fold v-else />
      </el-icon>
      <Breadcrumb class="ml-1" />
    </div>
    <div>header{{ isCollapse }}用户</div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import Breadcrumb from "@/layout/components/Breadcrumb/index.vue";

const { changeIsCollapse } = useGlobalSettingStore();
const { isCollapse } = storeToRefs(useGlobalSettingStore());

watch(
  () => isCollapse.value,
  (newVal) => {
    console.log(newVal, "header 中监听collapse变化");
  }
);

const handleChangeCollapse = changeIsCollapse;
</script>

<style scoped></style>
