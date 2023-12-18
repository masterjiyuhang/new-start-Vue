<template>
  <el-icon class="collapse-icon" @click="changeCollapse">
    <component :is="ThemeConfig.isCollapse ? 'expand' : 'fold'" />
  </el-icon>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";

const { setThemeConfig } = useGlobalSettingStore();
const { ThemeConfig } = storeToRefs(useGlobalSettingStore());

const changeCollapse = () => {
  setThemeConfig({
    ...ThemeConfig.value,
    isCollapse: !ThemeConfig.value.isCollapse,
  });
};
</script>

<style scoped>
.collapse-icon {
  margin-right: 20px;
  font-size: 20px;
  cursor: pointer;
}
</style>
