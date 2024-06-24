<template>
  <div class="wrapper-page">
    <div class="container" id="container">
      <div
        v-for="(item, index) in 500"
        :key="index"
        class="square"
        @mouseover="mouseOver"
        @mouseout="mouseOut"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
const mouseOver = (e: any) => {
  console.log("🚀 ~ file: index.vue:23 ~ mouseOver ~ e:", e.target.style);
  const color = getRandomColor();
  e.target.style.background = color;
  e.target.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
};
const mouseOut = (e: any) => {
  e.target.style.background = "#1d1d1d";
  e.target.style.boxShadow = "0 0 2px #000";
};
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
