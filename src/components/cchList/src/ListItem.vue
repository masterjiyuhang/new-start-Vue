<template>
  <div class="list-item">
    <label :style="labelStyle" class="truncate list-item__label">
      {{ label }}{{ isShowColon ? "：" : "" }}
    </label>
    <div class="list-item__content" :class="[isOverFlow && 'truncate block']">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type CSSProperties } from "vue";
import { ListKey } from "./constants";

interface Props {
  label: string;
  labelWidth?: number;
  isOverFlow?: boolean;
  isShowColon?: boolean;
  labelPosition?: "left" | "center" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  isShowColon: true,
  isOverFlow: false,
  labelPosition: "left",
});

const listProps = inject(ListKey, { col: 3 });

const labelStyle = computed<CSSProperties>(() => ({
  width: props.labelWidth ? `${props.labelWidth}px` : "auto",
  textAlign: props.labelPosition,
}));

const itemWidth = computed(() => `${100 / listProps.col}%`);
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  width: v-bind(itemWidth);
  min-height: 34px;
  float: left;
  line-height: 34px;

  &__label {
    display: block;
    margin-right: 8px;
    color: #333;
    font-size: 16px;
  }

  &__content {
    flex: 1;
    float: left;
    color: rgb(20 3 3 / 65%);
    font-size: 14px;

    ::v-deep(.el-button) {
      padding: 0;
      font-size: 14px;
    }

    div,
    span,
    a,
    label {
      font-size: inherit;
    }
  }
}
</style>
