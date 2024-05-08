<template>
  <div class="relative flex items-center justify-center w-full h-full">
    <section class="bg" :style="bgStyle"></section>
    <div class="loading-text" :style="textStyle">{{ percent }}%</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

const percent = ref(0);
const imageUrl = "https://cdn.cchang.fun/assets/1.jpg";

const scale = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const bgStyle = computed(() => ({
  background: `url(${imageUrl}) no-repeat center center/cover`,
  filter: `blur(${scale(percent.value, 0, 100, 30, 0)}px)`,
}));

const textStyle = computed(() => ({
  color: "#fff",
  opacity: scale(percent.value, 0, 100, 1, 0),
}));

let animationFrameId;

function animate() {
  if (percent.value < 100) {
    percent.value += 1;
    animationFrameId = requestAnimationFrame(animate);
  }
}

animate();

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
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
