<template>
  <div class="wrapper-page">
    <div class="container">
      <div class="progress-bar"></div>
      <div class="my-32 box"></div>

      <div class="my-32 box-2 size-32">
        <div v-for="item in 4" :key="item" :class="`bar bar-${item}`"></div>
      </div>

      <div class="flex flex-wrap justify-between w-full">
        <div
          v-for="item in 3"
          :key="item"
          class="flex justify-center items-center m-3 box-4"
        >
          <h2>{{ item }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  height: 4px;
  transform-origin: left;
  animation: grow 10s linear infinite;
  background-color: cch-variables.$primary;
}

@keyframes grow {
  0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
}

.box {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px solid transparent;
}

.box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  animation: border-flow 15s linear infinite;
  border: 2px solid #fff000;
  border-color: #fff000 transparent transparent;
}

@keyframes border-flow {
  0% {
    border-color: #fff000 transparent transparent;
  }

  25% {
    border-color: #fff000 #fff000 transparent transparent;
  }

  50% {
    border-color: transparent #fff000 #fff000 transparent;
  }

  75% {
    border-color: transparent transparent #fff000 #fff000;
  }

  100% {
    border-color: #fff000 transparent transparent #fff000;
  }
}

.box-2 {
  position: relative;
  background-color: azure;

  .bar {
    position: absolute;
    background-color: #f00;
  }

  .bar-1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: red;
  }

  .bar-2 {
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
  }

  .bar-3 {
    right: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
  }

  .bar-4 {
    bottom: 0;
    left: 0;
    width: 4px;
    height: 100%;
  }
}

@property --rotate {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.box-4 {
  position: relative;
  width: 300px;
  height: 300px;
  animation: rotating 2s linear infinite;
  animation-play-state: paused;
  border-radius: 20px;
  background: repeating-conic-gradient(
    from var(--rotate),
    #ff2770 0%,
    #ff2770 5%,
    transparent 5%,
    transparent 40%,
    #ff2770 50%
  );
  filter: drop-shadow(0 15px 50px #000);

  &:nth-child(1) {
    filter: drop-shadow(0 15px 50px #000) hue-rotate(225deg);
  }

  &:nth-child(3) {
    filter: drop-shadow(0 15px 50px #000) hue-rotate(310deg);
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    animation: rotating 2s linear infinite;
    animation-play-state: paused;
    animation-delay: -0.5s;
    border-radius: 20px;
    background: conic-gradient(
      from var(--rotate),
      hsl(360deg 100% 50%),
      hsl(315deg 100% 50%),
      hsl(270deg 100% 50%),
      hsl(225deg 100% 50%),
      hsl(180deg 100% 50%),
      hsl(135deg 100% 50%),
      hsl(90deg 100% 50%),
      hsl(45deg 100% 50%),
      hsl(0deg 100% 50%)
    );
  }

  &:hover,
  &:hover::before {
    animation-play-state: running;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 6px;
    border: 8px solid #25252b;
    border-radius: 15px;
    background-color: #2d2d39;
  }

  h2 {
    display: flex;
    position: absolute;
    z-index: 10;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #fff;
    border-radius: 10px;
    background-color: #000;
    // filter: blur(5px);
    box-shadow: inset 0 10px 20px rgb(0 0 0 / 50%);
    color: #fff;
    font-size: 2.5em;
    font-weight: 500;
    text-transform: uppercase;
    inset: 40px;
  }
}

@keyframes rotating {
  0% {
    --rotate: 0deg;
  }

  100% {
    --rotate: 360deg;
  }
}
</style>
