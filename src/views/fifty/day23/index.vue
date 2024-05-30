<template>
  <div class="wrapper-page">
    <div class="m-auto windmill">
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.windmill {
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }

  position: relative;
  width: 200px;
  height: 200px;
  animation: spin 3s linear infinite 0.5s;
  background-color: transparent;

  .blade {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border: 50px solid transparent;

    &:nth-child(1) {
      border-bottom-color: #e63946;
    }

    &:nth-child(2) {
      left: 50%;
      border-left-color: #f1faee;
    }

    &:nth-child(3) {
      top: 50%;
      left: 50%;
      border-top-color: #a8dadc;
    }

    &:nth-child(4) {
      top: 50%;
      left: 0;
      border-right-color: #457b9d;
    }
  }
}
</style>
