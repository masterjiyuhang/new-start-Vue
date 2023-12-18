<template>
  <div class="list">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="CchList">
import { provide } from "vue";
import { ListKey } from "./constants";

const props = withDefaults(
  defineProps<{
    col?: number;
  }>(),
  {
    col: 3,
  }
);
provide(ListKey, props);
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
