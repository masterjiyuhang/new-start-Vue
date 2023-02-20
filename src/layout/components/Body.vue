<template>
  <div :class="[isCollapse ? 'cch-body--collapse' : '']" class="cch-body">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isCollapse = ref<any>(false);
</script>

<style lang="scss">
@include b(body) {
  min-height: 100vh;
  transition: margin-left $side-bar-animate;
  margin-left: $side-bar-width;
  background-color: $bg-color;

  @include m(collapse) {
    margin-left: $side-bar-width-mini !important;

    .rc-content {
      left: $side-bar-width-mini !important;
    }
  }
}

@include is-windows {
  @include b(body) {
    // window 把颜色亮度降低 百分之 8%
    background-color: #f0f0f0;
  }
}
</style>
