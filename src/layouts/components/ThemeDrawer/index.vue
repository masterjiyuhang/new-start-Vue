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

const drawer = ref(false);

// rtl / ltr / ttb / btt
const direction = ref("rtl");
const handleClose = () => {
  console.log("关闭抽屉前的回调");
  drawer.value = false;
};

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
