<template>
  <section
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
    ref="loadingRef"
  >
    <footer>
      <slot name="tips">
        {{ tips }}
      </slot>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { SizeEnum } from "./constant";

defineOptions({
  name: "Loading",
});

interface LoadingProps {
  tips?: string;

  size?: SizeEnum;

  absolute?: boolean;

  loading?: boolean;

  background?: string;

  theme?: "dark" | "light";
}

withDefaults(defineProps<LoadingProps>(), {
  size: SizeEnum.DEFAULT,

  loading: false,

  theme: "dark",

  absolute: false,

  tips: "Loading...",
});
</script>

<style scoped lang="scss">
.full-loading {
  display: flex;
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(240 242 245 / 40%);

  &.absolute {
    position: absolute;
    z-index: 300;
    top: 0;
    left: 0;
  }
}
</style>
