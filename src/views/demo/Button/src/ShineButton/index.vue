<template>
  <div class="shine-btn">
    <button>Shine Button</button>
  </div>
</template>

<script setup lang="ts" name="ShineButton"></script>

<style scoped lang="scss">
.shine-btn {
  button {
    position: relative;
    width: 200px;
    height: 50px;
    overflow: hidden;
    border: 2px solid #333;
    background-color: #333;
    color: #fff;
    font-size: 24px;
    cursor: pointer;

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: -20px;
      left: -50px;
      width: 20px;
      height: 80px;
      transform: rotate(-45deg);
      background-color: #ffffff50;
    }

    &:hover {
      &::after {
        left: 120%;
        transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
      }
    }

    &:active {
      border: 2px solid #eee;
      color: #eee;
    }
  }
}
</style>
