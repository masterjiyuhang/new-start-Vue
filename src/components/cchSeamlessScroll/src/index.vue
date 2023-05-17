<script lang="ts">
export default {
  name: "SeamlessScroll",
};
</script>

<script setup lang="ts">
import { CSSProperties, PropType, computed } from "vue";
import * as utilsMethods from "./utils";

const { animationFrame } = utilsMethods;

animationFrame();

const reset = () => {
  console.log("reset");
};

defineExpose({
  reset,
});

const props = defineProps({
  data: {
    type: Array as PropType<any>,
  },
  classOption: {
    type: Object as PropType<any>,
    default: () => {
      return {
        key: 0,
      };
    },
  },
});

const float = computed((): CSSProperties => {
  return {
    float: "left",
    overflow: "hidden",
  };
});
// eslint-disable-next-line vue/no-setup-props-destructure
const { classOption } = props;
</script>

<template>
  <div class="seamless-scroll" @click="reset">
    <div :ref="'slotList' + classOption['key']" :style="float">
      <slot />
    </div>
  </div>
</template>
