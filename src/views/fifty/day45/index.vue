<template>
  <div class="wrapper-page">
    <div class="reverseRotate">
      <div class="rotate">
        <div class="content">正负旋转相消3D动画</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
div {
  transform-style: preserve-3d;
  perspective: 500px;
}

.reverseRotate {
  margin: 200px auto;
  animation: reverse-rotate 5s linear infinite;
}

.rotate,
.reverseRotate {
  width: 50vh;
  height: 50vh;
}

.content {
  width: 100%;
  height: 100%;
  background-color: rgb(255 100 100 / 80%);
  box-shadow: 0 0 8px 2px rgb(100 100 100 / 60%);
  color: #fff;
  font-size: 5vh;
  line-height: 50vh;
  text-align: center;
}

.rotate {
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotateX(0deg) rotateZ(0deg);
  }

  50% {
    transform: rotateX(40deg) rotateZ(180deg);
  }

  100% {
    transform: rotateX(0deg) rotateZ(360deg);
  }
}

@keyframes reverse-rotate {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(-360deg);
  }
}
</style>
