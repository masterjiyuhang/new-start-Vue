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
  </div>
</template>

<script setup lang="ts"></script>

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
</style>
