<template>
  <svg
    :class="svgClass"
    :style="{ width: size, height: size }"
    aria-hidden="true"
  >
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#409eff",
  },
  size: {
    type: String,
    default: "1em",
  },
});
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`;
});
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon";
});
</script>

<style scoped>
.svg-icon {
  position: relative;
  fill: currentcolor;
  vertical-align: -2px;
}
</style>
