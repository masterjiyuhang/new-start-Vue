<template>
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

  <el-footer v-if="ThemeConfig.footer" class="!h-auto">
    <Footer />
  </el-footer>
</template>

<script setup lang="ts">
import Tabs from "@/layouts/components/tabs/index.vue";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { emitter } from "@/utils/mitt";
import Footer from "@/layouts/components/footer/index.vue";
import { storeToRefs } from "pinia";
import { LAYOUT_CONFIG } from "../../config";

const { ThemeConfig, keepAliveName } = storeToRefs(useGlobalSettingStore());
const { setThemeConfig } = useGlobalSettingStore();

const isRouterShow = ref<boolean>(true);

const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (!ThemeConfig.value.isCollapse && screenWidth.value < LAYOUT_CONFIG.responsiveBreakpoint) {
    document.documentElement.style.setProperty("font-size", "12px");
    setThemeConfig({ ...ThemeConfig.value, isCollapse: true });
  }
  if (ThemeConfig.value.isCollapse && screenWidth.value > LAYOUT_CONFIG.responsiveBreakpoint) {
    document.documentElement.style.setProperty("font-size", "16px");
    setThemeConfig({ ...ThemeConfig.value, isCollapse: false });
  }
}, 100);

onMounted(() => {
  window.addEventListener("resize", listeningWindow, false);
  emitter.on("refreshCurrentPage", (flag) => {
    isRouterShow.value = flag;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
  emitter.off("refreshCurrentPage");
});
</script>

<style lang="scss" scoped>
.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: #f0f2f5;

  &::-webkit-scrollbar {
    background-color: #f0f2f5;
  }
}
</style>
