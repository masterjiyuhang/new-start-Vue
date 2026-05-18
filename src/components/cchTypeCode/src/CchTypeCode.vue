<template>
  <span :class="className"></span>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import TypeIt from "typeit";

interface Props {
  className?: string;
  values?: string[] | string;
  speed?: number;
  cursor?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  className: "type-it",
  values: () => [],
  speed: 250,
  cursor: true,
});

let typeInstance: TypeIt | null = null;

onMounted(() => {
  typeInstance = new TypeIt(`.${props.className}`, {
    strings: props.values,
    speed: props.speed,
    cursor: props.cursor,
  }).go();
});

onBeforeUnmount(() => {
  typeInstance?.destroy();
  typeInstance = null;
});
</script>
