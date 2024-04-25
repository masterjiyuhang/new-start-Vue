<template>
  <div class="day2-container wrapper-page">
    <div class="progress-container">
      <div
        class="progress-line"
        :style="{
          width: progressWidth + '%',
        }"
      ></div>
      <div
        v-for="item in stepList"
        :key="item"
        class="cursor-pointer circle"
        :class="activeIndex === item ? 'active' : ''"
        @click="handleSelect(item)"
      >
        {{ item }}
      </div>
    </div>

    <button
      class="btn"
      id="prev"
      :disabled="activeIndex === 1"
      @click="handlePrev"
    >
      Prev
    </button>
    <button
      class="btn"
      id="next"
      :disabled="activeIndex === stepList.length"
      @click="handleNext"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const stepList = ref([1, 2, 3, 4, 5]);

const activeIndex = ref(1);
const progressWidth = ref(0);

const handlePrev = () => {
  activeIndex.value -= 1;
  resetProgress();
};

const handleNext = () => {
  activeIndex.value += 1;
  resetProgress();
};

function handleSelect(index) {
  activeIndex.value = index;
  resetProgress();
}

function resetProgress() {
  progressWidth.value =
    ((activeIndex.value - 1) / (stepList.value.length - 1)) * 100;
}
</script>

<style lang="scss" scoped>
.day2-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .progress-container {
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 650px;
    max-width: 100%;
    margin-bottom: 30px;
  }

  .progress-container::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 0;
    width: 100%;
    height: 4px;
    transform: translateY(-50%);
    background-color: #eee;
  }

  .progress-line {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 0;
    height: 4px;
    transform: translateY(-50%);
    transition: 0.4s ease;
    background-color: #f80;
  }

  .circle {
    display: flex;
    z-index: 2;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    transition: 0.4s ease;
    border: 3px solid #eee;
    border-radius: 50%;
    background-color: #dae4be;
    color: #333;
    font-weight: 14px;
  }

  .active {
    border-color: #3ebeca;
    background-color: #a7e680;
    color: #fff;
  }

  .btn {
    margin: 5px;
    padding: 8px 30px;
    border: 0;
    border-radius: 6px;
    background-color: #3e92ca;
    color: rgb(231 219 178);
    font-family: inherit;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn:focus {
    outline: 0;
  }

  .btn:disabled {
    background-color: #e2e2e2;
    cursor: not-allowed;
  }
}
</style>
