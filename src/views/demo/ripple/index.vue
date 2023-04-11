<template>
  <div class="wrapper-page">
    <div>水波纹组件</div>
    <div class="select-none demo-box" v-RippleDirective>content</div>

    <div class="heart"></div>
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

.heart {
  width: 100px;
  height: 90px;
  position: relative;
  animation: heart 1s infinite;
}

.heart:before,
.heart:after {
  content: "";
  position: absolute;
  left: 50px;
  top: 0;
  width: 50px;
  height: 80px;
  background: red;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

@keyframes heart {
  0% {
    transform: scale(0.5);
  }
  20% {
    transform: scale(0.5);
  }
  40% {
    transform: scale(0.7);
  }
  60% {
    transform: scale(0.5);
  }
  80% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>
