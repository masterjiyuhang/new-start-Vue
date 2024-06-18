<template>
  <div>
    <h1 class="flex items-center justify-center">
      Double click on the image to
      <i class="sad sad-heart"></i>
      it
    </h1>
    <h2 class="text-center">You liked it {{ timesClicked }} times</h2>

    <div class="loveMe" ref="loveMeRef" @dblclick="createHeart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const loveMeRef = ref();
const timesClicked = ref(0);

const createHeart = (e: MouseEvent) => {
  const heart = document.createElement("div");
  heart.classList.add("sad");
  heart.classList.add("sad-heart");

  const x = e.clientX;
  const y = e.clientY;

  const leftOffset = (e.target as HTMLElement).offsetLeft;
  const topOffset = (e.target as HTMLElement).offsetTop;

  const xInside = x - leftOffset;
  const yInside = y - topOffset;

  heart.style.top = `${yInside}px`;
  heart.style.left = `${xInside}px`;

  loveMeRef.value.appendChild(heart);

  timesClicked.value += 1;

  // setTimeout(() => heart.remove(), 1000);
};

onMounted(() => {
  // Check if loveMeRef is correctly bound
  console.log(loveMeRef.value);
});
</script>

<style lang="scss">
@keyframes grow {
  to {
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
  }
}

.loveMe {
  position: relative; /* Ensure child elements are positioned relative to this */
  width: 500px;
  height: 400px;
  margin: auto;
  overflow: hidden;
  background-image: url("@/assets/system/HalloweenIllustrations7.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow:
    0 14px 28px rgb(87 122 204 / 25%),
    0 10px 10px rgb(37 220 223 / 22%);
  cursor: pointer;

  .sad-heart {
    position: absolute;
    width: 32px;
    height: 32px;
    transform: translate(-50%, -50%) scale(0);
    animation: grow 0.6s linear;
    border-radius: 50%;
  }
}

.sad {
  width: 32px;
  height: 32px;
}

.sad-heart {
  // background-color: rgb(76 143 202);
  --c: rgb(76 143 202);

  aspect-ratio: 1;
  background:
    radial-gradient(at 70% 31%, var(--c) 29%, #0000 30%),
    radial-gradient(at 30% 31%, var(--c) 29%, #0000 30%),
    conic-gradient(from -45deg at 50% 84%, var(--c) 90deg, #0000 0) bottom/100%
      50% no-repeat;
}
</style>
