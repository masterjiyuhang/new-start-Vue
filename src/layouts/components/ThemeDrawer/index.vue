<template>
  <el-drawer
    v-model="drawer"
    title="布局设置"
    :direction="direction"
    :before-close="handleClose"
  >
    <!-- 布局切换 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Notification /></el-icon>
      布局切换
    </el-divider>

    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker
        v-model="ThemeConfig.primary"
        :predefine="colorList"
        @change="changePrimary"
      />
    </div>

    <div class="theme-item">
      <span>暗黑模式</span>
      <el-switch
        v-model="ThemeConfig.isDark"
        @change="switchDark"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
      ></el-switch>
    </div>

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { emitter } from "@/utils/mitt";
import { DEFAULT_PRIMARY } from "@/config";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { useTheme } from "@/hooks/useTheme";
import { Sunny, Moon } from "@element-plus/icons-vue";

const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
const drawer = ref(false);

const { changePrimary, switchDark } = useTheme();

// rtl / ltr / ttb / btt
const direction = ref("rtl");
const handleClose = () => {
  console.log("关闭抽屉前的回调");
  drawer.value = false;
};

// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  "#DAA96E",
  "#0C819F",
  "#409EFF",
  "#27ae60",
  "#ff5c93",
  "#e74c3c",
  "#fd726d",
  "#f39c12",
  "#9b59b6",
];

onBeforeMount(() => {
  emitter.on("openThemeDrawer", () => {
    console.log("监听抽屉打开");
    drawer.value = true;
  });
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
