<template>
  <div
    class="container relative bg-blue-300 wrapper-page !p-0"
    :class="current"
  >
    <div
      class="absolute left-0 split left"
      @mouseenter="handleMouseEnter('left-hover')"
      @mouseleave="handleMouseLeave"
    >
      <h1 class="title">Playstation 5</h1>
      <a href="#" class="btn">Buy Now</a>
    </div>
    <div
      class="absolute right-0 split right"
      @mouseenter="handleMouseEnter('right-hover')"
      @mouseleave="handleMouseLeave"
    >
      <h1 class="title">XBox Series X</h1>
      <a href="#" class="btn">Buy Now</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const current = ref("");
function handleMouseEnter(e) {
  current.value = e;
}

function handleMouseLeave() {
  current.value = "";
}
</script>

<style scoped lang="scss">
$left-bg-color: rgb(87 84 236 / 70%);
$right-bg-color: rgb(43 43 43 / 80%);
$left-btn-hover-color: rgb(87 84 236 / 100%);
$right-btn-hover-color: rgb(28 122 28 / 100%);
$hover-width: 75%;
$other-width: 25%;
$speed: 1000ms;

.split {
  position: absolute;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.left {
  transition: all $speed ease-in-out;
  background: no-repeat center/80% url("@/assets/shopping/OnlineShopping1.png");

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all $speed ease-in-out;
    background-color: $left-bg-color;
  }

  .btn:hover {
    border-color: $left-btn-hover-color;
    background-color: $left-btn-hover-color;
  }
}

.right {
  transition: all $speed ease-in-out;
  background: no-repeat center/80% url("@/assets/shopping/OnlineShopping3.png");

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all $speed ease-in-out;
    background-color: $right-bg-color;
  }

  .btn:hover {
    border-color: $right-btn-hover-color;
    background-color: $right-btn-hover-color;
  }
}

.left-hover {
  .left {
    width: $hover-width;
  }

  .right {
    width: $other-width;
  }
}

.right-hover {
  .right {
    width: $hover-width;
  }

  .left {
    width: $other-width;
  }
}

.btn {
  display: flex;
  position: absolute;
  top: 40%;
  left: 50%;
  align-items: center;
  justify-content: center;
  width: 15rem;
  padding: 1.5rem;
  transform: translateX(-50%);
  border: #fff solid 0.2rem;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
}

.title {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 4rem;
  white-space: nowrap;
}
</style>
