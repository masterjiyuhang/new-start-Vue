<template>
  <div :class="getClass">
    <header v-if="getShowHeader">
      <slot name="header">
        <h1>{{ props.title }}</h1>
      </slot>
    </header>
    <div class="overflow-hidden" :class="getContentClass" ref="contentRef">
      <slot></slot>
    </div>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, useAttrs, useSlots } from "vue";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  title?: string;
  contentBackground?: boolean;
  contentClass?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const attrs = useAttrs();
const slots = useSlots();

const getClass = computed(() => {
  return ["wrapper-page", attrs.class ?? {}];
});

const getShowHeader = computed(() => {
  return slots.headerContent || props.title;
});

const getContentClass = computed(() => {
  const { contentBackground, contentClass } = props;
  return [
    contentClass,
    {
      ["content-bg"]: contentBackground,
    },
  ];
});
</script>

<style lang="scss" scoped></style>
