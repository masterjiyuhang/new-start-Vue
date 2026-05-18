<template>
  <svg
    :class="[prefixCls, $attrs.class, spin && 'svg-icon-spin']"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";

interface Props {
  prefix?: string;
  name: string;
  size?: number | string;
  spin?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  size: 16,
  spin: false,
});

const prefixCls = "cch-svg-icon";
const symbolId = computed(() => `#${props.prefix}-${props.name}`);

const getStyle = computed((): CSSProperties => {
  const s = `${props.size}`.replace("px", "");
  return {
    width: `${s}px`,
    height: `${s}px`,
  };
});
</script>

<style lang="scss" scoped>
$prefix-cls: "cch-svg-icon";

.#{$prefix-cls} {
  display: inline-block;
  overflow: hidden;
  fill: currentcolor;
  vertical-align: -0.15em;

  &-spin {
    animation: loadingCircle 1s infinite linear;
  }
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
