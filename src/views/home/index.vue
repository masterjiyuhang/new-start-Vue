<template>
  <div class="wrapper-page">
    <img :src="welcome" class="home-img" />
    <SvgIcon name="Box" color="#f80"/>
  </div>
</template>

<script setup lang="ts">
import welcome from "@/assets/system/HalloweenIllustrations11.png";
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<style lang="scss" scoped>
.home-img {
  $s: 30%; /* image size */
  $b: 55px; /* border thickness */
  $c: #d8bfc3; /* border color */
  --f: 1; /* initial scale */

  $g: 50% / calc(100% / var(--f)) 100% no-repeat content-box;
  $o: calc((1 / var(--f) - 1) * $s / 2 - $b);

  width: $s;
  aspect-ratio: 1;
  padding-top: calc($s / 5);
  cursor: pointer;
  border-radius: 0 0 calc($s / 2) calc($s / 2);
  outline: $b solid $c;
  outline-offset: $o;
  background: radial-gradient(
      circle closest-side,
      #ecd078 calc(99% - $b),
      $c calc(100% - $b) 99%,
      #0000
    )
    $g;
  -webkit-mask: linear-gradient(#000 0 0) no-repeat 50% calc(-1 * $o) /
      calc(100% / var(--f) - 2 * $b) 50%,
    radial-gradient(circle closest-side, #000 99%, #0000) $g;
  transform: scale(var(--f));
  transition: 0.5s;

  &:hover {
    --f: 1.6; /* hover scale */
  }
}
</style>
