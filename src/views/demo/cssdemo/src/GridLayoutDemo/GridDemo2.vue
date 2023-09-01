<template>
  <div>
    <h1>瀑布流布局</h1>
    <div class="g-container">
      <div class="g-item"></div>
      <div class="g-item"></div>
      <div class="g-item"></div>
      <div class="g-item"></div>
      <div class="g-item"></div>
      <div class="g-item"></div>
      <div class="g-item"></div>
      <div class="g-item"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$count: 8;

@function random-num($max, $min: 0, $u: 1) {
  @return ($min + random($max)) * $u;
}

@function random-color() {
  @return rgb(random-num(255), random-num(255), random-num(255));
}

@for $i from 1 to $count + 1 {
  .g-item:nth-child(#{$i}) {
    position: relative;
    margin: 0.5vw;
    background: random-color();

    &::after {
      content: "#{$i}";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 2vw;
    }
  }
}

.g-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(8, 1fr);
  height: 100vh;
}

.g-item {
  &:nth-child(1) {
    grid-column: 1;
    grid-row: 1 / 3;
  }

  &:nth-child(2) {
    grid-column: 2;
    grid-row: 1 / 4;
  }

  &:nth-child(3) {
    grid-column: 3;
    grid-row: 1 / 5;
  }

  &:nth-child(4) {
    grid-column: 4;
    grid-row: 1 / 6;
  }

  &:nth-child(5) {
    grid-column: 1;
    grid-row: 3 / 9;
  }

  &:nth-child(6) {
    grid-column: 2;
    grid-row: 4 / 9;
  }

  &:nth-child(7) {
    grid-column: 3;
    grid-row: 5 / 9;
  }

  &:nth-child(8) {
    grid-column: 4;
    grid-row: 6 / 9;
  }
}
</style>
