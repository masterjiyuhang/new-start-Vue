<template>
  <div class="wrapper-page">
    <canvas
      id="canvas"
      width="800"
      height="700"
      ref="canvasRef"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
      @mousemove="mouseMove"
    ></canvas>
    <div class="toolbox">
      <button class="tool-item" @click="decreaseSize">-</button>
      <span class="tool-item">{{ size }}</span>
      <button class="tool-item" @click="addSize">+</button>
      <span
        :style="{
          color: color,
        }"
      >
        {{ color }}</span
      >
      <input type="color" class="tool-item" v-model="color" />
      <button class="tool-item" @click="clear">X</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const MAX_SIZE = 50;
const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = "#333333";

const color = ref(DEFAULT_COLOR);
const size = ref(DEFAULT_SIZE);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const isPress = ref(false);
const position = ref({ x: 0, y: 0 });

let ctx: CanvasRenderingContext2D | null | undefined = null;

onMounted(() => {
  ctx = canvasRef.value?.getContext("2d");
});

const mouseDown = (e: MouseEvent) => {
  isPress.value = true;
  position.value = { x: e.offsetX, y: e.offsetY };
};
const mouseUp = () => {
  isPress.value = false;
  position.value = { x: 0, y: 0 };
};
const mouseMove = (e: MouseEvent) => {
  if (isPress.value) {
    const { x: newX, y: newY } = position.value;
    drawCircle(newX, newY);
    drawLine(newX, newY, e.offsetX, e.offsetY);
    position.value = { x: e.offsetX, y: e.offsetY };
  }
};

const clear = () => {
  ctx?.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);
};
const drawCircle = (x: number, y: number) => {
  ctx!.beginPath();
  ctx!.arc(x, y, size.value, 0, Math.PI * 2);
  ctx!.fillStyle = color.value;
  ctx!.fill();
};

const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
  ctx!.beginPath();
  ctx!.moveTo(x1, y1);
  ctx!.lineTo(x2, y2);
  ctx!.strokeStyle = color.value;
  ctx!.lineWidth = size.value * 2;
  ctx!.stroke();
};

const addSize = () => {
  size.value = (size.value + 1) % (MAX_SIZE + 1) || DEFAULT_SIZE;
};
const decreaseSize = () => {
  size.value = (size.value - 1 + MAX_SIZE + 1) % (MAX_SIZE + 1) || DEFAULT_SIZE;
};
</script>

<style lang="scss" scoped>
canvas {
  border: 2px solid steelblue;
  background-color: #fff;
}

.toolbox {
  display: flex;
  width: 804px;
  padding: 1rem;
  border: 1px solid slateblue;
  background-color: steelblue;
}

.tool-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 0.25rem;
  padding: 0.25rem;
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 2rem;
  cursor: pointer;
}

.toolbox > *:last-child {
  margin-left: auto;
}
</style>
