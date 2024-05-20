<template>
  <div class="flex flex-col items-center justify-center m-5">
    <div>
      <span :style="{ color }">
        {{ value }}
      </span>
    </div>
    <div>
      <button class="mr-3 btn base-shadow" @click="start">Start</button>
      <button class="btn" @click="reset">Reset</button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  unref,
  onMounted,
  watch,
} from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";
import { isNumber } from "lodash";

const props = {
  startVal: { type: Number, default: 0 },
  endVal: { type: Number, default: 2021 },
  duration: { type: Number, default: 1500 },
  autoplay: { type: Boolean, default: true },
  decimals: {
    type: Number,
    default: 2,
    validator(value: number) {
      return value >= 0;
    },
  },
  prefix: { type: String, default: "" },
  suffix: { type: String, default: "" },
  separator: { type: String, default: "," },
  decimal: { type: String, default: "." },
  /**
   * font color
   */
  color: { type: String, default: "#f00" },
  /**
   * Turn on digital animation
   */
  useEasing: { type: Boolean, default: true },
  /**
   * Digital animation
   */
  transition: { type: String, default: "linear" },
};

export default defineComponent({
  name: "CountTo",
  props,
  emits: ["onStarted", "onFinished"],
  setup(props, { emit }) {
    const source = ref(props.startVal);
    const disabled = ref(false);
    let outputValue = useTransition(source);

    const value = computed(() => formatNumber(unref(outputValue)));

    watchEffect(() => {
      source.value = props.startVal;
    });

    watch([() => props.startVal, () => props.endVal], () => {
      if (props.autoplay) {
        start();
      }
    });

    onMounted(() => {
      props.autoplay && start();
    });

    function start() {
      run();
      source.value = props.endVal;
    }

    function reset() {
      source.value = props.startVal;
      run();
    }

    function run() {
      outputValue = useTransition(source, {
        disabled,
        duration: props.duration,
        onFinished: () => emit("onFinished"),
        onStarted: () => emit("onStarted"),
        ...(props.useEasing
          ? { transition: TransitionPresets[props.transition] }
          : {}),
      });
    }

    function formatNumber(num: number | string) {
      if (!num && num !== 0) {
        return "";
      }
      const { decimals, decimal, separator, suffix, prefix } = props;
      num = Number(num).toFixed(decimals);
      num += "";

      const x = num.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? decimal + x[1] : "";

      const rgx = /(\d+)(\d{3})/;
      if (separator && !isNumber(separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + separator + "$2");
        }
      }
      return prefix + x1 + x2 + suffix;
    }

    return { value, start, reset };
  },
});
</script>

<style lang="scss" scoped>
.btn {
  padding: 20px 50px;
  border-radius: 4px;
  background: #f80;
  color: aliceblue;
}
</style>
