<template>
  <div>
    <div>
      <p class="shadow-word pink">PINK</p>
    </div>
    <div>
      <p class="shadow-word orange">Box-Shadow</p>
    </div>
    <div>
      <p class="shadow-word yellow">YELLOW</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.shadow-word {
  display: inline;
  color: antiquewhite;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 5vmin; /* 字体大小将根据视窗的最小高度和最小宽度中较小的那个百分比来设置 */
  line-height: 10vmin;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}

.pink {
  animation: pink-animation 0.5s ease-in-out infinite alternate;
  color: pink;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #e91e63,
    0 0 35px #f30, 0 0 40px #333, 0 0 50px #eee, 0 0 75px #444;
  filter: brightness(110%) grayscale(0%);
}

.orange {
  color: #ff5722;
}

.orange:hover {
  animation: orange 1.5s ease-in-out infinite alternate;
}

.yellow {
  color: #ffeb3b;
}

.yellow:hover {
  animation: yellow 1.5s ease-in-out infinite alternate;
}

@keyframes pink-animation {
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #e91e63,
      0 0 70px #f80, 0 0 80px #f80, 0 0 100px #f80, 0 0 150px #f80;
  }
}

@keyframes orange {
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff5722,
      0 0 70px #ff5722, 0 0 80px #ff5722, 0 0 100px #ff5722, 0 0 150px #ff5722;
  }

  from {
    filter: brightness(110%);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff5722,
      0 0 35px #ff5722, 0 0 40px #ff5722, 0 0 50px #ff5722, 0 0 75px #ff5722;
  }
}

@keyframes yellow {
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ffeb3b,
      0 0 70px #ffeb3b, 0 0 80px #ffeb3b, 0 0 100px #ffeb3b, 0 0 150px #ffeb3b;
  }

  from {
    filter: brightness(110%);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ffeb3b,
      0 0 35px #ffeb3b, 0 0 40px #ffeb3b, 0 0 50px #ffeb3b, 0 0 75px #ffeb3b;
  }
}
</style>
