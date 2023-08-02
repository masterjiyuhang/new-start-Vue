<template>
  <div class="list-item">
    <label :style="labelStyle" class="truncate list-item__label">
      {{ label }}{{ isShowColon ? "：" : "" }}
    </label>
    <div class="list-item__content" :class="[isOverFlow && 'truncate block']">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts" name="CchList">
import { computed, inject } from "vue";
import { ListKey } from "./constants";

const ListProps = inject(ListKey);

interface Props {
  label: string;
  labelWidth?: number;
  isOverFlow?: boolean;
  isShowColon?: boolean;
  labelPosition?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isShowColon: true,
  isOverFlow: false,
  labelPosition: "left",
});

const labelStyle: any = computed(() => {
  return {
    width: props.labelWidth ? `${props.labelWidth}px` : "auto",
    textAlign: props.labelPosition,
  };
});

const itemStyle = computed(() => {
  const itemWidth = 100 / ListProps.col || 3;
  return `${itemWidth}%`;
});
</script>

<style lang="scss" scoped>
.list-item {
  width: v-bind(itemStyle);
  min-height: 34px;
  line-height: 34px;
  float: left;
  display: flex;

  &__label {
    display: block;
    color: #333;
    font-size: 16px;
    margin-right: 8px;
  }

  &__content {
    float: left;
    color: rgba(20, 3, 3, 0.65);
    text-align: left;
    font-size: 14px;
    flex: 1;

    v-deep::el-button {
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
