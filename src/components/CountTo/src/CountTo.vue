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
      console.log(
        "🚀 ~ file: CountTo.vue:69 ~ watchEffect ~ watchEffect:",
        watchEffect,
      );
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

    /**
     * 格式化数字。
     * @param num 要格式化的数字，可以是数字或数字字符串。
     * @returns 格式化后的数字字符串。如果输入无效，则返回空字符串。
     */
    function formatNumber(num: number | string) {
      // 检查num是否为无效值（包括null、undefined、空字符串和0）
      if (!num && num !== 0) {
        return "";
      }
      // 从props中解构所需的格式化选项
      const { decimals, decimal, separator, suffix, prefix } = props;
      // 将num转换为固定小数位的字符串格式
      num = Number(num).toFixed(decimals);
      num += ""; // 确保num为字符串类型

      // 分离整数部分和小数部分
      const x = num.split(".");
      let x1 = x[0]; // 整数部分
      const x2 = x.length > 1 ? decimal + x[1] : ""; // 小数部分，如果存在

      // 正则表达式用于在整数部分每3位添加分隔符
      const rgx = /(\d+)(\d{3})/;
      // 如果设置了分隔符且分隔符为非数字字符，则应用分隔符
      if (separator && !isNumber(separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + separator + "$2");
        }
      }
      // 组合格式化后的整数部分、小数部分以及前缀和后缀，然后返回
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
