<template>
  <div class="wrapper-page">
    学习tsx

    <tsxComp1 />

    <tsxComp2 :message="'父组件传递给tsx组件的信息'" />

    <cch :name="'传递进去的name'" @on-click="fooClick" />
  </div>
</template>

<script setup lang="ts">
import { tsxComp1, tsxComp2 } from "./components/tsxComp";
import cch from "./components/testDefineComponent";

const fooClick = (e) => {
  console.log("父组件收到了", e);
};
</script>

<style scoped></style>
