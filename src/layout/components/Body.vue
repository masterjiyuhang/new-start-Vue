<template>
  <div :class="[isCollapse ? 'cch-body--collapse' : '']" class="cch-body">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { emitter } from "@/utils/mitt";

const isCollapse = ref<any>(false);
onMounted(() => {
  emitter.on("changeSidebarCollapse", (value) => {
    console.log(value, "监听事件变化了被");
    isCollapse.value = value;
  });
});
</script>

<style lang="scss">
@include cch.b(body) {
  min-height: 100vh;
  transition: margin-left cch-variables.$side-bar-animate;
  margin-left: cch-variables.$side-bar-width;
  background-color: cch-variables.$bg-color;

  @include cch.m(collapse) {
    margin-left: cch-variables.$side-bar-width-mini !important;

    .rc-content {
      left: cch-variables.$side-bar-width-mini !important;
    }
  }
}

@include cch.is-windows {
  @include cch.b(body) {
    // window 把颜色亮度降低 百分之 8%
    background-color: #f0f0f0;
  }
}
</style>
