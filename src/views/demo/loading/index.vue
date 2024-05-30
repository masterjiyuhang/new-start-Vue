<template>
  <div class="wrapper-page">
    <div class="relative">
      <Loading
        :loading="isLoading"
        :absolute="isAbsolute"
        :tips="'加载中...'"
      />
      <div class="bg-yellow-400 w-full h-[130px]"></div>
      <el-button @click="handleShowLoading(true)">看看实力 容器内</el-button>
      <el-button @click="handleShowLoading(false)">看看实力 全屏幕</el-button>
    </div>

    <div class="kinetic"></div>
    <div class="relative my-10 ss">
      <div class="a1 ss-item"></div>
      <div class="a2 ss-item"></div>
      <div class="a3 ss-item"></div>
      <div class="a4 ss-item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Loading from "./src/Loading.vue";

const isLoading = ref(false);
const isAbsolute = ref(false);

const handleShowLoading = (flag) => {
  isAbsolute.value = flag;
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
};
</script>

<style lang="scss" scoped>
.kinetic {
  @keyframes rotate-a {
    0%,
    25% {
      transform: rotate(0deg);
    }

    50%,
    75% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotate-b {
    0%,
    25% {
      transform: rotate(90deg);
    }

    50%,
    75% {
      transform: rotate(270deg);
    }

    100% {
      transform: rotate(450deg);
    }
  }

  position: relative;
  width: 100px;
  height: 100px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    animation: rotate-a 2s linear infinite 0.5s;
    border: 50px solid transparent;
  }

  &::before {
    transform: rotate(90deg);
    animation: rotate-b 2s linear infinite;
    border-bottom-color: #f00;
  }

  &::after {
    border-bottom-color: #fff;
  }
}

.ss {
  @keyframes spinning {
    0% {
      transform: rotate(0deg);
    }

    12.5% {
      transform: rotate(45deg);
    }

    25% {
      transform: rotate(90deg);
    }

    37.5% {
      transform: rotate(135deg);
    }

    50% {
      transform: rotate(180deg);
    }

    62.5% {
      transform: rotate(225deg);
    }

    75% {
      transform: rotate(270deg);
    }

    87.5% {
      transform: rotate(315deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  width: 100px;
  height: 100px;

  .ss-item {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    animation: spinning 2s linear infinite 0.5s;
    border: 50px solid transparent;
  }

  .a1 {
    border-bottom-color: #9b5de5;
  }

  .a2 {
    border-top-color: #f15bb5;
  }

  .a3 {
    border-left-color: #fee440;
  }

  .a4 {
    border-right-color: #00bbf9;
  }
}
</style>
