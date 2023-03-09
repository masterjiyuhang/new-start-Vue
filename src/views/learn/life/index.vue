<template>
  <div>
    <h1>生命周期</h1>
    <TestLife v-if="isShow" />
    <el-button @click="isShow = !isShow">change visible</el-button>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onRenderTracked,
  onRenderTriggered,
  ref,
} from "vue";
import TestLife from "./src/components/TestLife.vue";

const isShow = ref(true);

console.log("父组件 setup");

// 当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。
onBeforeMount(() => {
  console.log("父组件 onBeforeMount");
});

// 其所有同步子组件都已经被挂载 (不包含异步组件或 <Suspense> 树内的组件)。
// 其自身的 DOM 树已经创建完成并插入了父容器中。
onMounted(() => {
  console.log("父组件 onMounted 在组件挂载完成后执行。");
});

// 在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。
onBeforeUpdate(() => {
  console.log("父组件 onBeforeUpdate");
});

onUpdated(() => {
  console.log("父组件 onUpdated");
});
onBeforeUnmount(() => {
  console.log("父组件 onBeforeUnmount");
});

onUnmounted(() => {
  console.log("父组件 onUnmounted");
});

onRenderTracked((e) => {
  console.log("父组件 onRenderTracked", e);
});
onRenderTriggered((e) => {
  console.log("父组件 onRenderTriggered", e);
});
</script>

<style scoped></style>
