<template>
  <div class="relative">
    <div data-name="线性渐变文字" class="w-96 solid-word">线性渐变文字</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.solid-word {
  position: relative;
  z-index: 2;
  margin: 5vmin auto;
  border: #b8c0ff dashed 3px;
  font-family: "Times New Roman", serif;
  font-size: 10vmin;
  line-height: 20vmin;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    background-image: linear-gradient(
      35deg,
      #ffd6ff 20%,
      #e7c6ff 40%,
      #c8b6ff 60%,
      #b8c0ff 80%,
      #bbd0ff 100%
    );
    background-size: contain;
    inset: 0;
  }

  &:hover {
    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      inset: 0;
      background-image: linear-gradient(
        -45deg,
        #fff 0%,
        #fff 25%,
        transparent 25%,
        transparent 50%,
        #fff 50%,
        #fff 75%,
        transparent 75%,
        transparent 100%
      );
      background-size: 6px 6px;
    }

    &::after {
      content: attr(data-name);
      position: absolute;
      z-index: 2;
      inset: -4px 6px 6px -2px;
      color: #f80;
      text-shadow: 3px 3px #fff;
    }
  }
}
</style>
