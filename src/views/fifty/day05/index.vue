<template>
  <div class="relative flex items-center justify-center w-full h-full">
    <section
      class="bg"
      :style="{
        filter: `blur(${scale(percent, 0, 100, 30, 0)}px)`,
      }"
    ></section>
    <div
      class="loading-text"
      :style="{
        opacity: scale(percent, 0, 100, 1, 0),
      }"
    >
      {{ percent }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";

let timer = setInterval(() => {
  if (percent.value > 99) {
    clearInterval(timer);
  }

  percent.value += 1;
}, 30);
const percent = ref(0);

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.bg {
  position: absolute;
  z-index: 0;
  top: -30px;
  left: -30px;
  width: calc(100%);
  height: calc(100%);
  background: url("https://images.unsplash.com/photo-1576161787924-01bb08dad4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80")
    no-repeat center center/cover;
}

.loading-text {
  color: #fff;
}
</style>
