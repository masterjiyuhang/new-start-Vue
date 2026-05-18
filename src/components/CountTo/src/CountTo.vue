<template>
  <div class="flex flex-col items-center justify-center m-5">
    <div>
      <span :style="{ color }">
        {{ displayValue }}
      </span>
    </div>
    <div>
      <button class="mr-3 btn base-shadow" @click="start">Start</button>
      <button class="btn" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransition, TransitionPresets } from "@vueuse/core";

interface Props {
  startVal?: number;
  endVal?: number;
  duration?: number;
  autoplay?: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimal?: string;
  color?: string;
  useEasing?: boolean;
  transition?: string;
}

const props = withDefaults(defineProps<Props>(), {
  startVal: 0,
  endVal: 2021,
  duration: 1500,
  autoplay: true,
  decimals: 2,
  prefix: "",
  suffix: "",
  separator: ",",
  decimal: ".",
  color: "#f00",
  useEasing: true,
  transition: "linear",
});

const emit = defineEmits<{
  onStarted: [];
  onFinished: [];
}>();

const source = ref(props.startVal);
const disabled = ref(false);
let outputValue = useTransition(source);

const displayValue = computed(() => formatNumber(unref(outputValue)));

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
  if (separator && typeof separator !== "number") {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${separator}$2`);
    }
  }
  return prefix + x1 + x2 + suffix;
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 20px 50px;
  border-radius: 4px;
  background: #f80;
  color: aliceblue;
}
</style>
