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
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: #f1762f;
  color: #fff;
  font-size: 24px;
}

.heart {
  position: relative;
  width: 100px;
  height: 90px;
  animation: heart 1s infinite;
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50px;
  width: 50px;
  height: 80px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
  border-radius: 50px 50px 0 0;
  background: red;
}

.heart::after {
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
