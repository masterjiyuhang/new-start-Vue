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

const itemtype = computed(() => {
  const itemWidth = 100 / ListProps.col || 3;
  return `${itemWidth}%`;
});
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  width: v-bind(itemtype);
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
    text-align: left;

    /deep/.el-button {
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
