<template>
  <div
    class="relative flex flex-col items-center justify-center w-full p-4 time-clock"
  >
    <h1 class="mb-4 text-fuchsia-400">一个时钟{{ apRef }}</h1>
    <div class="relative flex">
      <div class="border-purple-500 circle text-emerald-500">
        <svg>
          <circle
            :cx="circleRadius"
            :cy="circleRadius"
            :r="circleRadius"
            :style="{
              strokeDashoffset:
                strokeDasharray - (strokeDasharray * hourRef) / 12,
            }"
            class="stroke-cyan-500"
          />
        </svg>
        {{ hourRef.toString().padStart(2, "00") }}
        <div
          class="absolute left-0 right-0 mx-auto my-0 text-xs text-center bottom-3"
        >
          HOURS
        </div>
      </div>
      <div class="circle text-emerald-400">
        <svg>
          <circle
            :cx="circleRadius"
            :cy="circleRadius"
            :r="circleRadius"
            :style="{
              strokeDashoffset:
                strokeDasharray - (strokeDasharray * minutesRef) / 60,
            }"
            class="stroke-cyan-400"
          />
        </svg>
        {{ minutesRef.toString().padStart(2, "00") }}
        <!-- <div
          class="absolute left-0 right-0 mx-auto my-0 text-xs text-center bottom-3"
        >
          minutes
        </div> -->
      </div>
      <div class="circle text-emerald-300">
        <svg>
          <circle
            :cx="circleRadius"
            :cy="circleRadius"
            :r="circleRadius"
            :style="{
              strokeDashoffset:
                strokeDasharray - (strokeDasharray * seconds) / 60,
            }"
            class="stroke-cyan-300"
          />
        </svg>
        {{ seconds.toString().padStart(2, "00") }}
        <div
          class="absolute left-0 right-0 mx-auto my-0 text-xs text-center bottom-3"
        >
          seconds
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const circleRadius = 75;
const strokeDasharray = 471;

enum AP {
  AM = "AM",
  PM = "PM",
}

const getCurrentTime = () => {
  const date = new Date();
  const _24h = date.getHours();
  const h = _24h % 12;
  const m = date.getMinutes();
  const s = date.getSeconds();
  console.log(AP.PM, AP.AM);
  const ap = _24h >= 12 ? AP.PM : AP.AM;
  return { h, m, s, ap };
};

const currentTime = getCurrentTime();

const hourRef = ref(currentTime.h);
const minutesRef = ref(currentTime.m);
const seconds = ref(currentTime.s);
const apRef = ref(currentTime.ap);

const timer = setInterval(() => {
  const { h, m, s, ap } = getCurrentTime();
  hourRef.value = h;
  minutesRef.value = m;
  apRef.value = ap;
  if (s !== seconds.value) {
    seconds.value = s;
  }
}, 1000);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="scss">
.time-clock {
  border: 1px dashed sandybrown;
  height: 314px;

  $borderWidth: 6px;

  .circle {
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    font-size: 40px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border: $borderWidth solid #191919;
    border-radius: 50%;
    margin-right: 30px;
    user-select: none;
    position: relative;

    svg {
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      top: -$borderWidth;
      left: -$borderWidth;
      transform: rotate(-90deg);

      circle {
        width: 100%;
        height: 100%;
        fill: transparent;
        stroke-width: $borderWidth;
        stroke-dasharray: 471;
      }
    }
  }

  .text {
    position: absolute;
    font-size: 12px;
    font-weight: 400;
    width: 66px;
    text-align: center;
    color: #cccccc;
    left: 0;
    right: 0;
    bottom: 22px;
    margin: 0 auto;
  }
}
</style>
