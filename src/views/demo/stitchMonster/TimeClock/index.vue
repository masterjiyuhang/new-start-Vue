<template>
  <div>
    <h1>一个时钟{{ apRef }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const circleRadius = 75;
const strokeDasharray = 471;

enum AP {
  "AM",
  "PM",
}

const getCurrentTime = () => {
  const date = new Date();
  const _24h = date.getHours();
  const h = _24h % 12;
  const m = date.getMinutes();
  const s = date.getSeconds();
  const ap = _24h >= 12 ? "PM" : "AM";
  return { h, m, s, ap };
};

const currentTime = getCurrentTime();

const hourRef = ref(currentTime.h);
const minutesRef = ref(currentTime.m);
const apRef = ref(currentTime.ap);
const seconds = ref(currentTime.s);

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

<style scoped></style>
