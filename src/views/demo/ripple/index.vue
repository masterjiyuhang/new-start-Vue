<template>
  <div class="m-auto wrapper-page">
    <div class="text-3xl text-left text-cyan-200">水波纹组件</div>
    <div class="m-auto select-none demo-box" v-RippleDirective>content</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  background-color: #f1762f;
  color: #fff;
  font-size: 24px;
}
</style>
