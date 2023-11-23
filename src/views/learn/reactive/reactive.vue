<template>
  <div class="wrapper-page">
    reactive
    <!-- 响应式原理 -->
    <hr />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "./src/reactive";
import { effect } from "./src/effect";

const cc = reactive({ name: "cch", age: 32, habit: { say: "sb" } });

effect(() => {
  console.log("effect run");
});
setTimeout(() => {
  cc.name = "er";
  setTimeout(() => {
    console.log(cc);
  }, 1000);
}, 1000);
</script>

<style scoped></style>
