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
import { computed, nextTick, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { emitter } from "@/utils/mitt";
import { useTabsStore } from "@/stores/modules/tabs";
import { HOME_URL } from "@/config";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const {
  removeKeepAliveName,
  addKeepAliveName,
  setKeepAliveName,
  setThemeConfig,
} = useGlobalSettingStore();

const { ThemeConfig } = storeToRefs(useGlobalSettingStore());

const { removeTabs, closeMultipleTab } = useTabsStore();

// maximize current page
const maximize = () => {
  setThemeConfig({
    ...ThemeConfig.value,
    maximize: !ThemeConfig.value.maximize,
  });
};

// 刷新当前页
const refresh = () => {
  setTimeout(() => {
    removeKeepAliveName(route.name as string);
    emitter.emit("refreshCurrentPage", false);

    nextTick(() => {
      addKeepAliveName(route.name as string);
      emitter.emit("refreshCurrentPage", true);
    });
  }, 0);
};

// 关闭当前页
const closeCurrentTab = () => {
  if (route.meta.isAffix) return;
  removeTabs(route.fullPath);
  removeKeepAliveName(route.name as string);
};

// 关闭其他页
const closeOtherTab = () => {
  closeMultipleTab(route.fullPath);
  setKeepAliveName([route.name] as string[]);
};

// 关闭全部
const closeAllTab = () => {
  closeMultipleTab();
  setKeepAliveName();
  router.push(HOME_URL);
};

// 首页时不展示关闭当前页
const isHomePath = computed(() => route.fullPath === HOME_URL);

onMounted(() => {
  emitter.on("closeThisPage", (e) => {
    console.log("tabs close emmiter close this page", e);
    if (e) {
      closeCurrentTab();
    }
  });
});
</script>

<style scoped lang="scss">
@import "../index";
</style>
