<template>
  <div class="shadow-demo-2 flex-c">Hover Me</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.shadow-demo-2 {
  position: relative;
  width: 5vmax;
  height: 5vmax;
  margin: 20px auto;
  background-color: coral;
  cursor: pointer;

  &::after,
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  &:hover {
    &::before {
      z-index: 1;
      transform: translate(100%, 0) skewY(10deg) scaleX(0.6);
      transform-origin: 0 50%;
      animation: shadow-move-y 5s infinite linear alternate;
      background: linear-gradient(90deg, rgb(214 16 16 / 81.4%), transparent);
    }

    &::after {
      z-index: 1;
      transform: translate(10%, -100%) skewX(-10deg) scaleX(1);
      transform-origin: center;
      animation: shadow-move-x 5s infinite linear alternate;
      background: linear-gradient(90deg, rgb(16 214 59 / 81.4%), transparent);
    }
  }
}

@keyframes shadow-move-y {
  to {
    transform: translate(100%, 0) skewY(-30deg) scaleX(0.6);
  }
}
@keyframes shadow-move-x {
  to {
    transform: translate(20%, -100%) skewX(-30deg) scaleX(0.6);
  }
}
</style>
