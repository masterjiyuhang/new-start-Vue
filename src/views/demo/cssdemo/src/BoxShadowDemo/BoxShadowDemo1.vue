<template>
  <div class="box-shadow-demo1-container">
    <div class="shadow-inner"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box-shadow-demo1-container {
  $color: #e91e63;

  position: relative;
  width: 130px;
  height: 130px;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 50%;

  .shadow-inner {
    @keyframes border {
      0% {
        box-shadow: 60px -60px 0 2px $color, -60px -60px 0 2px $color,
          -60px 60px 0 2px $color, 60px 60px 0 2px $color, 0 0 0 2px transparent;
      }

      25% {
        box-shadow: 0 -125px 0 2px $color, -60px -60px 0 24px $color,
          -60px 60px 0 2px $color, 60px 60px 0 2px $color, 0 0 0 2px #fff;
      }

      50% {
        box-shadow: 0 -125px 0 2px $color, -125px 0 0 2px $color,
          -60px 60px 0 2px $color, 60px 60px 0 2px $color, 0 0 0 2px #fff;
      }

      75% {
        box-shadow: 0 -125px 0 2px $color, -125px 0 0 2px $color,
          0 125px 0 2px $color, 60px 60px 0 2px $color, 0 0 0 2px #fff;
      }

      100% {
        box-shadow: 0 -125px 0 2px $color, -125px 0 0 2px $color,
          0 125px 0 2px $color, 120px 40px 0 2px $color, 0 0 0 2px #fff;
      }
    }

    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 120px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 60px -60px 0 2px $color, -60px -60px 0 2px $color,
      -60px 60px 0 2px $color, 60px 60px 0 2px $color;
    color: #fff;
    font-size: 20px;
    line-height: 120px;
    text-align: center;
    cursor: pointer;

    &:hover {
      animation: border 0.5s ease forwards;
    }
  }
}
</style>
