<template>
  <div class="wrapper-page">
    <div class="container" id="container">
      <div
        v-for="(_, index) in 500"
        :key="index"
        class="square"
        :style="squareStyles[index] || {}"
        @mouseover="mouseOver(index)"
        @mouseout="mouseOut(index)"
      >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const squareStyles = reactive<Record<number, { background?: string; boxShadow?: string }>>({});

function mouseOver(index: number) {
  const color = getRandomColor();
  squareStyles[index] = {
    background: color,
    boxShadow: `0 0 2px ${color}, 0 0 10px ${color}`,
  };
}

function mouseOut(index: number) {
  squareStyles[index] = {
    background: "#1d1d1d",
    boxShadow: "0 0 2px #000",
  };
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 800px;
}

.square {
  width: 24px;
  height: 24px;
  margin: 4px;
  transition: 2s ease;
  background-color: #1d1d1d;
  box-shadow: 0 0 2px #000;
  cursor: progress;
}

.square:hover {
  transition-duration: 0s;
}
</style>
