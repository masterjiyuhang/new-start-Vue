<template>
  <div class="turntable-wrap">
    <div class="turntable-bg">
      <div class="light"></div>
      <div class="pointer" @click="gameStart"></div>
      <div class="turntable" ref="turntableRef">
        <ul class="prize" v-if="turntableList.length">
          <li v-for="(item, index) in turntableList" :key="index">
            <img
              class="img"
              :src="item.type === turntableFail ? turntableFailImg : item.icon"
            />
          </li>
        </ul>
      </div>
      <div class="decorate1"></div>
      <div class="decorate2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { lists, type TurntableItem } from "./constant";
import turntableFailImg from "@/assets/images/404.png";

const turntableRef = ref<HTMLElement>();
const turntableSuccess = 1;
const turntableFail = 2;

const isRunning = ref(false);
const currentAngle = ref(0);

const turntableList = reactive<TurntableItem[]>([...lists]);

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function pickResult(): TurntableItem {
  const randNum = Math.floor(Math.random() * 100) + 1;
  let count = 0;
  for (const item of turntableList) {
    item.min = count;
    count += item.rate;
    item.max = count;
  }

  let result = turntableList.find(
    (item) => randNum > item.min! && randNum <= item.max!,
  )!;

  if (result.type === turntableSuccess && !result.result_img) {
    result = turntableList.find((item) => item.type === turntableFail)!;
  }

  return result;
}

function animateTo(
  from: number,
  to: number,
  duration: number,
  onUpdate: (angle: number) => void,
  onDone: () => void,
) {
  const startTime = performance.now();

  function tick(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const angle = from + (to - from) * eased;

    onUpdate(angle);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      onDone();
    }
  }

  requestAnimationFrame(tick);
}

const gameStart = () => {
  if (!turntableList.length) return;
  if (isRunning.value) return;

  isRunning.value = true;

  const result = pickResult();

  const targetOffset = result.location * -60 + 60;
  const baseRotations = 360 * 5;
  const targetAngle = currentAngle.value + baseRotations + (targetOffset - (currentAngle.value % 360));

  const duration = 4000;

  animateTo(
    currentAngle.value,
    targetAngle,
    duration,
    (angle) => {
      if (turntableRef.value) {
        turntableRef.value.style.transform = `rotate(${angle}deg)`;
      }
    },
    () => {
      currentAngle.value = targetAngle % 360;
      if (turntableRef.value) {
        turntableRef.value.style.transform = `rotate(${currentAngle.value}deg)`;
      }

      setTimeout(() => {
        isRunning.value = false;
      }, 1000);
    },
  );
};
</script>

<style lang="scss" scoped>
.turntable-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #f80;

  .turntable-bg {
    position: relative;
    z-index: 2;
    width: 840px;
    height: 1111px;
    margin: auto;
    background: url("@/assets/luckyDraw/turntable-bg.png") no-repeat 100% 100%;
    background-position: center;
    background-size: contain;

    .light {
      position: absolute;
      top: 4px;
      left: 0;
      width: 822px;
      height: 830px;
      margin: auto;
      animation: rotate 15s linear infinite;
      background: url("@/assets/luckyDraw/light.png") no-repeat 100% 100%;
      background-size: contain;
    }

    .pointer {
      position: absolute;
      z-index: 1;
      top: 255px;
      left: 310px;
      width: 206px;
      height: 268px;
      background: url("@/assets/luckyDraw/turntable-pointer.png") no-repeat 100%
        100%;
      background-size: contain;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .turntable {
      position: absolute;
      top: 45px;
      left: 48px;
      width: 746px;
      height: 746px;
      transform: rotate(0deg);
      background: url("@/assets/luckyDraw/turntable.png") no-repeat 100% 100%;
      background-size: contain;

      .prize {
        position: absolute;
        top: 130px;
        right: 0;
        left: 0;
        width: 500px;
        height: 500px;
        margin: 0 auto;
        transform: rotate(-15deg);

        li {
          position: absolute;
          top: 0;
          left: 0;
          width: 250px;
          height: 250px;
          transform-origin: right bottom;
          border-radius: 50%;
          color: #000;
          line-height: 250px;
          text-align: center;

          &:nth-child(1) {
            transform: rotate(60deg);
          }

          &:nth-child(2) {
            transform: rotate(120deg);
          }

          &:nth-child(3) {
            transform: rotate(180deg);
          }

          &:nth-child(4) {
            transform: rotate(240deg);
          }

          &:nth-child(5) {
            transform: rotate(300deg);
          }

          &:nth-child(6) {
            transform: rotate(360deg);
          }

          .img {
            display: block;
            width: 150px;
            height: 150px;
            transform: rotate(-45deg);
            border: 0;
          }
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
