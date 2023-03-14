<template>
  <div>
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
import { defineAsyncComponent } from "vue";

const Dashboard = defineAsyncComponent(() => import("./SyncComp.vue"));
</script>

<style scoped></style>
