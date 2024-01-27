<template>
  <div class="wrapper-page">
    <h1>watch {{ state.count }}</h1>
    <el-input v-model="state.count" class="!w-[210px]" />
    <hr />
    <h1>watchEffect {{ msg1 }}</h1>
    <el-input v-model="msg1" class="!w-[210px]" />
    <el-button @click="stopWatch" type="primary">stop watch effect</el-button>
    <hr />
    <el-button type="primary" @click="handleAddCounter">{{
      counter
    }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { effectScope } from "vue";
import { computed } from "vue";
import { reactive, ref, watch, watchEffect } from "vue";
import type { DebuggerEvent } from "vue";

// 侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (count, prevCount) => {
    console.log(count, prevCount);
    /* ... */
  }
);
const msg1 = ref("1");

interface WatchEffectOptions {
  flush?: "pre" | "post" | "sync"; // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void;
  onTrigger?: (event: DebuggerEvent) => void;
}

const stopWatch = watchEffect(
  (onCleanup) => {
    // console.log(msg1.value);

    // 清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。
    onCleanup(() => {
      console.log("clean up fn");
    });
  },
  {
    flush: "pre",
  } as WatchEffectOptions
);

/**
 * 与 watchEffect() 相比，watch() 使我们可以：
 * 懒执行副作用；
 * 更加明确是应该由哪个状态触发侦听器重新执行；
 * 可以访问所侦听状态的前一个值和当前值。
 */

const scope = effectScope();
const counter = ref(1);
scope.run(() => {
  const double = computed(() => counter.value * 2);

  watch(double, () => console.log(double.value));

  watchEffect(() => console.log("Count:", double.value));
});

// scope.stop();

const handleAddCounter = () => {
  counter.value++;
};
</script>

<style scoped></style>
