<template>
  <div class="wrapper-page">
    <div class="flex flex-col items-center justify-between">
      <div class="relative w-[200px] h-[200px]">
        <div
          class="bg-white needle hour"
          ref="hourRef"
          :style="{
            transform: hourTransform,
          }"
        ></div>
        <div
          class="bg-white needle minute"
          ref="minuteRef"
          :style="{
            transform: minuteTransform,
          }"
        ></div>
        <div
          class="bg-white needle second"
          ref="secondRef"
          :style="{
            transform: secondTransform,
          }"
        ></div>
        <div class="center-point"></div>
      </div>

      <div class="time">{{ currentTime }}</div>
      <div class="date">{{ currentDate }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const hourTransform = ref("");
const minuteTransform = ref();
const secondTransform = ref();
const currentTime = ref("");
const currentDate = ref("");

// function animate() {
//   const time = new Date();
//   // 保持不变
//   const month = time.getMonth();
//   const day = time.getDay();
//   const date = time.getDate();
//   const hours = time.getHours();
//   const hoursForClock = hours >= 13 ? hours % 12 : hours;
//   const minutes = time.getMinutes();
//   const seconds = time.getSeconds();
//   const ampm = hours >= 12 ? "PM" : "AM";

//   console.log(1);
//   hourTransform.value = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`;
//   minuteTransform.value = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`;
//   secondTransform.value = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`;

//   currentTime.value = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
//   currentDate.value = `${days[day]}, ${months[month]} ${date}`;
//   requestAnimationFrame(animate);
// }

function updateTimeOnce() {
  const now = new Date().getTime();
  if (now - updateTime >= 1000) {
    updateTime = now;
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hourTransform.value = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`;
    minuteTransform.value = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`;
    secondTransform.value = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`;

    currentTime.value = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    currentDate.value = `${days[day]}, ${months[month]} ${date}`;

    setTimeout(() => {
      rafId = requestAnimationFrame(updateTimeOnce);
    }, 1000); // 确保下一次更新在1秒后
  }
}
onMounted(() => {
  // debouncedAnimate();
  updateTimeOnce();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId); // 添加这个以清理动画帧
});

let rafId;
let updateTime = 0;
</script>

<style lang="scss" scoped>
.needle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 65px;
  transform-origin: bottom center;
  transition: all 0.5s ease-in linear;
  background-color: #fff;
}

.hour {
  transform: translate(-50%, -100%) rotate(0deg);
}

.minute {
  height: 100px;
  transform: translate(-50%, -100%) rotate(0deg);
}

.second {
  height: 100px;
  transform: translate(-50%, -100%) rotate(0deg);
  background-color: #e74c3c;
}

.center-point {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #e74c3c;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: var(--primary-color);
  }
}

.time {
  font-size: 60px;
}

.date {
  color: #aaa;
  font-size: 14px;
  letter-spacing: 0.3px;
  text-transform: uppercase;

  .circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    transition: all 0.5s ease-in;
    border-radius: 50%;
    background-color: #fff;
    color: #484848;
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
