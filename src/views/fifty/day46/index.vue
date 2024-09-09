<template>
  <div class="container wrapper-page">
    <div class="bbs"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
// @keyframes mask-rotate {
//   @for $i from 0 through 100 {
//     #{$i}% {
//       mask: linear-gradient(
//         45deg,
//         #000 #{$i + "%"},
//         transparent #{$i + 5 + "%"},
//         transparent 1%
//       );
//     }
//   }
// }

.bbs {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("https://erhang-cdn.imgix.net/Pika.gif?s=0d394ab763b07fa13927a48c069d801c");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    // mask: linear-gradient(45deg, #000 50%, transparent 50%);
    mask: linear-gradient(32deg, #000 40%, transparent 60%);
    // animation: mask-rotate 11.2s ease-in-out;
    background: url("https://erhang-cdn.imgix.net/health.jpg?s=6300de21c98ed8dc58021875feabe2ec");
    background-size: cover;
    inset: 0;
  }
}
</style>
