<template>
  <div class="base-card">
    <div>水波纹组件</div>
    <div class="demo-box" v-RippleDirective>content</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.demo-box {
  display: flex;
  width: 300px;
  height: 300px;
  font-size: 24px;
  color: #fff;
  background-color: #f1762f;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
}
</style>
