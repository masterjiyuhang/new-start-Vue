<template>
  <div class="wrapper-page">
    <Loading loading :tips="'加载中...'">
        <div class="bg-yellow-400 w-[130px] h-[130px]"></div>
    </Loading>
  </div>
</template>

<script setup lang="ts">
import Loading from "./src/Loading.vue";
</script>

<style scoped></style>
