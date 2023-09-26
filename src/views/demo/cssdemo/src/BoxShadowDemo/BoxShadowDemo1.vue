<template>
  <div class="box-shadow-demo1-container">
    <div class="shadow-demo1-shadow-inner"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$color: #e91e63;
$shadow-width: 25px;
$shadow-width-desc: -25px;

@keyframes border {
  0% {
    box-shadow: 20px -20px 0 2px $color, -20px -20px 0 2px $color,
      -20px 20px 0 2px $color, 20px 20px 0 2px $color, 0 0 0 2px transparent;
  }

  // 25% {
  //   box-shadow: 0 -25px 0 2px $color, -20px -20px 0 24px $color,
  //     -20px 20px 0 2px $color, 20px 20px 0 2px $color, 0 0 0 2px #fff;
  // }

  // 50% {
  //   box-shadow: 0 -25px 0 2px $color, -25px 0 0 2px $color,
  //     -20px 20px 0 2px $color, 20px 20px 0 2px $color, 0 0 0 2px #fff;
  // }

  // 75% {
  //   box-shadow: 0 -25px 0 2px $color, -25px 0 0 2px $color, 0 25px 0 2px $color,
  //     20px 20px 0 2px $color, 0 0 0 2px #fff;
  // }

  100% {
    box-shadow: 0 -25px 0 2px $color, -25px 0 0 2px $color, 0 25px 0 2px $color,
      25px 0 0 2px $color, 0 0 0 2px #fff;
  }
}

.box-shadow-demo1-container {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 20px auto;

  // overflow: hidden;

  border-radius: 50%;

  // box-shadow: $shadow-width $shadow-width-desc 0 2px $color,
  //   $shadow-width-desc $shadow-width-desc 0 2px $color,
  //   $shadow-width-desc $shadow-width 0 2px $color,
  //   $shadow-width $shadow-width 0 2px $color;
}

.shadow-demo1-shadow-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: 0 0 2px 10px rgb(0 0 0 / 50%), 0 0 2px 10px rgb(0 0 0 / 50%),
    0 0 2px 10px rgb(0 0 0 / 50%), 0 0 2px 10px rgb(0 0 0 / 50%); /* 添加阴影效果 */

  cursor: pointer;

  &:hover {
    // transition: 0.5s ease-in-out;
    animation: border 3.5s ease forwards;
    background-color: rgb(227 168 136);
  }
}
</style>
