<template>
  <el-dropdown trigger="click" :teleported="false">
    <el-button size="small" type="primary">
      <span>{{ $t("tabs.more") }}</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon> 刷新
        </el-dropdown-item>
        <el-dropdown-item @click="maximize">
          <el-icon><FullScreen /></el-icon>
          {{ ThemeConfig.maximize ? "取消全屏" : "全屏" }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeCurrentTab" v-if="!isHomePath">
          <el-icon><Remove /></el-icon> 关闭当前页
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon> 关闭其他页
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon><FolderDelete /></el-icon> 关闭全部
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { emitter } from "@/utils/mitt";
import { useTabsStore } from "@/stores/modules/tabs";
import { HOME_URL } from "@/config";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const globalSettingStore = useGlobalSettingStore();
const { removeKeepAliveName, setKeepAliveName, setThemeConfig } = globalSettingStore;
const { ThemeConfig } = storeToRefs(globalSettingStore);
const { removeTabs, closeMultipleTab } = useTabsStore();

const maximize = () => {
  setThemeConfig({
    ...ThemeConfig.value,
    maximize: !ThemeConfig.value.maximize,
  });
};

const refresh = () => {
  globalSettingStore.refreshPage(route.name as string);
};

const closeCurrentTab = () => {
  if (route.meta.isAffix) return;
  removeTabs(route.fullPath);
  removeKeepAliveName(route.name as string);
};

const closeOtherTab = () => {
  closeMultipleTab(route.fullPath);
  setKeepAliveName([route.name] as string[]);
};

const closeAllTab = () => {
  closeMultipleTab();
  setKeepAliveName();
  router.push(HOME_URL);
};

const isHomePath = computed(() => route.fullPath === HOME_URL);

onMounted(() => {
  emitter.on("closeThisPage", (e) => {
    if (e) closeCurrentTab();
  });
});
</script>

<style scoped lang="scss">
@use "../index";
</style>
