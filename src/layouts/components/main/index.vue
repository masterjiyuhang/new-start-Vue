<template>
  <div>
    <Tabs v-if="ThemeConfig.tabs" />
    <el-main>
      <router-view v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive :include="keepAliveName">
            <component :is="Component" :key="route.path" v-if="isRouterShow" />
          </keep-alive>
        </transition>
      </router-view>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/layouts/components/tabs/index.vue";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { onBeforeUnmount, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

const { ThemeConfig, keepAliveName, isCollapse, setThemeConfig } =
  useGlobalSettingStore();

// 刷新当前页面
const isRouterShow = ref<boolean>(true);
// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (!isCollapse.value && screenWidth.value < 1200)
    setThemeConfig({ ...ThemeConfig, isCollapse: true });
  if (isCollapse.value && screenWidth.value > 1200)
    setThemeConfig({ ...ThemeConfig, isCollapse: false });
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped></style>
