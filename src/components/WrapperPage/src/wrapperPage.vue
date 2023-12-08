<template>
  <div :class="getClass" ref="wrapperRef">
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
import {
  CSSProperties,
  PropType,
  computed,
  ref,
  useAttrs,
  useSlots,
} from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    title?: string;
    content?: string;

    dense?: boolean;
    ghost?: boolean;
    contentStyle?: PropType<CSSProperties>;

    contentFullHeight?: boolean;
    contentBackground?: boolean;
    contentClass?: string;

    fixedHeight?: boolean;
    upwardSpace?: [number?, string?];
  }>(),
  {}
);

const wrapperRef = ref(null);
const attrs = useAttrs();
const slots = useSlots();

const getClass = computed(() => {
  return ["wrapper-page", attrs.class ?? {}];
});

const getShowHeader = computed(() => {
  return props.content || slots.headerContent || props.title;
});

const getContentClass = computed(() => {
  const { contentBackground, contentClass } = props;
  return [
    contentClass,
    {
      [`content-bg`]: contentBackground,
    },
  ];
});
</script>

<style lang="scss" scoped></style>
