<template>
  <div class="wrapper-page">
    <h1 class="mt-3 text-center">Drink Water</h1>
    <h3 class="my-4 text-center text-blue-400">Goal: 2 Liters</h3>

    <div class="cup" :class="{ full: isFull }">
      <div class="remained" v-if="!isFull">
        <span>{{ liter }}</span>
        <small>Remained</small>
      </div>

      <div
        class="percentage"
        :style="{
          visibility: percentageHeight === 0 ? 'hidden' : 'visible',
          height: percentageHeight,
        }"
      >
        {{ percentage }}
      </div>
    </div>

    <p class="text-center mb-2.5">
      Select how many glasses of water that you have drank
    </p>

    <div class="flex items-center justify-center cups">
      <div
        v-for="item in smallCups"
        :key="item.id"
        class="cup cup-small"
        :class="item.full ? 'full' : ''"
        @click="handleSmallCup(item)"
      >
        250 ml
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const smallCups = ref(
  Array.from({ length: 8 }).map((_, idx) => ({
    id: idx,
    full: false,
  })),
);

const percentage = ref("");
const liter = ref("");
const percentageHeight = ref<number | string>(0);

function handleSmallCup(e) {
  let idx = e.id;

  if (smallCups.value[idx].full) {
    idx--;
  } else if (smallCups.value[idx + 1] && smallCups.value[idx + 1].full) {
    idx--;
  }

  smallCups.value.forEach((item, index) => {
    if (index <= idx) {
      item.full = true;
    } else {
      item.full = false;
    }
  });
  updateBigCup();
}

const isFull = computed(() => {
  return (
    smallCups.value.filter((item) => item.full).length ===
    smallCups.value.length
  );
});

function updateBigCup() {
  const totalCups = smallCups.value.length;
  const fullCups = smallCups.value
    .map((cup) => cup.full)
    .filter(Boolean).length;

  if (fullCups === 0) {
    percentageHeight.value = 0;
  } else {
    percentageHeight.value = `${(fullCups / totalCups) * 330}px`;
  }

  percentage.value = `${(fullCups / totalCups) * 100}%`;
  liter.value = `${2 - (250 * fullCups) / 1000}L`;
}
</script>

<style lang="scss" scoped>
$border-color: #144fc6;
$fill-color: #6ab3f8;

.cup {
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 330px;
  margin: 30px auto;
  overflow: hidden;
  border: 4px solid $border-color;
  border-radius: 0 0 40px 40px;
  background-color: #fff;
  color: $border-color;

  .remained {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease;
    text-align: center;
  }
}

.cup-small {
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 95px;
  margin: 5px;
  transition: 0.3s ease;
  border-radius: 0 0 15px 15px;
  background-color: rgb(255 255 255 / 90%);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.full {
  background-color: $fill-color;
  color: #fff;
}

.percentage {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: $fill-color;
  font-size: 30px;
  font-weight: bold;
}
</style>
