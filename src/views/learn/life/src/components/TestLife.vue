<template>
  <div>
    <h1>{{ name }}</h1>
    <el-button @click="changeName">change name</el-button>
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

const name = ref<string>("CCH");
const changeName = () => (name.value = "erhang");

console.log("ZZZZZi子组件 setup");
// 当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。
onBeforeMount(() => {
  console.log("ZZZZZi子组件 onBeforeMount 在组件被挂载之前被调用");
});

// 其所有同步子组件都已经被挂载 (不包含异步组件或 <Suspense> 树内的组件)。
// 其自身的 DOM 树已经创建完成并插入了父容器中。
onMounted(() => {
  console.log("ZZZZZi子组件 onMounted 在组件挂载完成后执行。");
});

// 在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。
onBeforeUpdate(() => {
  console.log("ZZZZZi子组件 onBeforeUpdate 更新其 DOM 树之前调用");
});

// 注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。
onUpdated(() => {
  console.log(
    "ZZZZZi子组件 onUpdated 在组件因为响应式状态变更而更新其 DOM 树之后调用。"
  );
});

// 注册一个钩子，在组件实例被卸载之前调用。
onBeforeUnmount(() => {
  console.log("ZZZZZi子组件 onBeforeUnmount 在组件实例被卸载之前调用");
});

// 注册一个回调函数，在组件实例被卸载之后调用。
onUnmounted(() => {
  console.log("ZZZZZi子组件 onUnmounted 在组件实例被卸载之后调用");
});

onRenderTracked((e) => {
  console.log(
    "ZZZZZi子组件 onRenderTracked 当组件渲染过程中追踪到响应式依赖时调用",
    e
  );
});

onRenderTriggered((e) => {
  console.log(
    "ZZZZZi子组件 onRenderTriggered 当响应式依赖的变更触发了组件渲染时调用",
    e
  );
});
</script>

<style lang="scss" scoped></style>
