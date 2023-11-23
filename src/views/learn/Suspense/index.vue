<template>
  <div class="wrapper-page">
    <el-button @click="reloadPage">reload</el-button>
    <!-- <Suspense> 是一个内置组件，用来在组件树中协调对异步依赖的处理。 -->
    <Suspense>
      <template #default>
        <!-- 具有深层异步依赖的组件 -->
        <Dashboard />
      </template>

      <!-- 在 #fallback 插槽中显示 “正在加载中” -->
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

const Dashboard = defineAsyncComponent({
  loader: () => import("./SyncComp.vue"),
  delay: 1500,
});

const route = useRoute();

const { refreshPage } = useGlobalSettingStore();

const reloadPage = () => {
  refreshPage(route.name as string);
};
</script>

<style scoped></style>
