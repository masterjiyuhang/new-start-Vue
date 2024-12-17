<template>
  <div>
    <div class="loader"></div>
    <div
      content=""
      class="relative box-border block mx-auto my-5 bg-cyan-400 loader-1 size-16 animate-spin before:content-[attr(content)] after:content-[attr(content)]"
      :class="[
        'before:absolute before:size-16 before:box-border before:left-0 before:top-0 before:rotate-45 before:bg-cyan-400 before:shadow-sm',
        'after:absolute after:size-12 after:box-border after:left-1/2 after:top-1/2 after:bg-cyan-600 after:-translate-x-[50%] after:-translate-y-[50%] after:shadow-sm after:duration-300 after:rounded-full',
      ]"
    ></div>

    <div class="relative my-4 size-20">
      <div
        v-for="item in 4"
        :key="item"
        class="absolute -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full shadow-sm opacity-0 circle top-1/2 left-1/2"
      ></div>
    </div>

    <div
      class="relative flex items-center justify-center my-4 size-24 rounded-[50%] bg-transparent"
    >
      <div class="circle-4"></div>
    </div>
  </div>

  <div class="letter-loader">
    <p>
      <span
        v-for="(item, index) in letter"
        :key="item"
        class="letter"
        :style="{
          animationDelay: `${index * 0.1}s`,
        }"
      >
        {{ item }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
const letter = ref("Loading...");
</script>

<style lang="scss" scoped>
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader {
  display: block;
  position: relative;
  box-sizing: border-box;
  width: 64px;
  height: 64px;
  margin: 20px auto;
  animation: rotation 2s linear infinite;
  background: #ff6b6b;
}

.loader::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 64px;
  height: 64px;
  transform: rotate(45deg);
  background: #ff3d3d;
  box-shadow: 0 0 5px rgb(0 0 0 / 15%);
}

.loader::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgb(255 107 107);
  box-shadow: 0 0 5px rgb(0 0 0 / 15%);
}

@keyframes pulse {
  0% {
    width: 0;
    height: 0;
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }

  10% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0.5;
  }

  100% {
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
  animation: pulse 4s infinite linear;
  border: 0.5px solid #f3f3f3;
  border-radius: 100%;
  opacity: 0;
  box-shadow: 0 0 5px #eef0e5;

  &:nth-child(1) {
    animation-delay: 0.2s;
  }

  &:nth-child(2) {
    animation-delay: 0.4s;
  }

  &:nth-child(3) {
    animation-delay: 0.8s;
  }

  &:nth-child(4) {
    animation-delay: 1s;
  }
}

@keyframes circle14512 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.circle-4 {
  position: absolute;
  width: 80px;
  height: 80px;
  animation: circle14512 2s linear infinite;
  border: 2px solid #31c848;
  border-radius: 50%;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: #32e4ff;
    box-shadow:
      0 0 20px #f80,
      0 0 60px #ff3d3d;
  }
}

@keyframes letter-loading {
  0% {
    font-size: 30px;
  }

  50% {
    font-size: 40px;
  }

  100% {
    font-size: 30px;
  }
}

.letter-loader {
  position: relative;

  .letter {
    animation: letter-loading 1s infinite;
  }
}
</style>
