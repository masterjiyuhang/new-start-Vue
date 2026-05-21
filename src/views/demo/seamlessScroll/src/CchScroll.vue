<!-- eslint-disable vue/no-v-html -->
<template>
  <div :ref="(el) => setRef('wrap' + classOption['key'], el as HTMLElement)">
    <div
      :ref="(el) => setRef('realBox' + classOption['key'], el as HTMLElement)"
      :style="pos"
      @mouseenter="enter"
      @mouseleave="leave"
      @touchstart.passive="touchStart"
      @touchmove.passive="touchMove"
      @touchend="touchEnd"
      @mousewheel.passive="wheel"
    >
      <div
        :ref="(el) => setRef('slotList' + classOption['key'], el as HTMLElement)"
        :style="float"
        class="slot-list"
      >
        <slot></slot>
      </div>
      <div v-html="copyHtml" :style="float"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { copyObj } from "./utils";

interface ClassOption {
  key?: number;
  step?: number;
  limitMoveNum?: number;
  hoverStop?: boolean;
  direction?: "top" | "bottom" | "left" | "right";
  openTouch?: boolean;
  singleHeight?: number;
  singleWidth?: number;
  waitTime?: number;
  switchOffset?: number;
  autoPlay?: boolean;
  navigation?: boolean;
  switchSingleStep?: number;
  switchDelay?: number;
  switchDisabledClass?: string;
  isSingleRemUnit?: boolean;
  [key: string]: unknown;
}

const props = defineProps<{
  data: unknown[];
  classOption: ClassOption;
}>();

const emit = defineEmits<{
  scrollEnd: [];
}>();

defineExpose({ reset });

// ref map for template refs
const refMap = new Map<string, HTMLElement>();
const setRef = (name: string, el: HTMLElement | null) => {
  if (el) refMap.set(name, el);
};

// reactive state
const xPos = ref(0);
const yPos = ref(0);
const delay = ref(0);
const height = ref(0);
const width = ref(0);
const realBoxWidth = ref(0);
const realBoxHeight = ref(0);
const copyHtml = ref("");
const singleWaitTime = ref<ReturnType<typeof setTimeout> | null>(null);
const reqFrame = ref<number | null>(null);
const startPos = ref<{ x: number; y: number } | null>(null);
const startPosX = ref<number | null>(null);
const startPosY = ref<number | null>(null);
const isHover = ref(false);
const ease = ref("ease-in");

// computed
const defaultOption = computed(() => ({
  step: 1.3,
  limitMoveNum: 5,
  hoverStop: true,
  direction: "top" as const,
  openTouch: true,
  singleHeight: 0,
  singleWidth: 0,
  waitTime: 1000,
  switchOffset: 30,
  autoPlay: true,
  navigation: false,
  switchSingleStep: 134,
  switchDelay: 400,
  switchDisabledClass: "disabled",
  isSingleRemUnit: false,
}));

const options = computed(() =>
  copyObj({}, defaultOption.value, props.classOption) as Record<string, unknown>
);

const autoPlay = computed(() => {
  if (navigation.value) return false;
  return options.value.autoPlay;
});

const scrollSwitch = computed(
  () => props.data.length > (options.value.limitMoveNum as number)
);

const hoverStopSwitch = computed(
  () => options.value.hoverStop && autoPlay.value && scrollSwitch.value
);

const canTouchScroll = computed(() => options.value.openTouch);

const isHorizontal = computed(
  () =>
    options.value.direction !== "bottom" && options.value.direction !== "top"
);

const float = computed(() =>
  isHorizontal.value
    ? { float: "left" as const, overflow: "hidden" as const }
    : { overflow: "hidden" as const }
);

const pos = computed(() => ({
  transform: `translate(${xPos.value}px,${yPos.value}px)`,
  transition: `all ${ease.value} ${delay.value}ms`,
  overflow: "hidden",
}));

const navigation = computed(() => options.value.navigation);

const baseFontSize = computed(() =>
  (options.value.isSingleRemUnit as boolean)
    ? parseInt(
        window.getComputedStyle(document.documentElement, null).fontSize
      )
    : 1
);

const realSingleStopWidth = computed(
  () => (options.value.singleWidth as number) * baseFontSize.value
);

const realSingleStopHeight = computed(
  () => (options.value.singleHeight as number) * baseFontSize.value
);

const step = computed(() => {
  let singleStep: number;
  const stepVal = options.value.step as number;
  if (isHorizontal.value) {
    singleStep = realSingleStopWidth.value;
  } else {
    singleStep = realSingleStopHeight.value;
  }
  if (singleStep > 0 && singleStep % stepVal > 0) {
    console.error(
      "如果设置了单步滚动，step需是单步大小的约数，否则无法保证单步滚动结束的位置是否准确"
    );
  }
  return stepVal;
});

// debounced wheel handler (created once)
const debouncedWheelMove = useDebounceFn((deltaY: number) => {
  if (deltaY > 0) {
    yPos.value -= step.value;
  } else {
    yPos.value += step.value;
  }
}, 50);

// methods
function wheel(e: WheelEvent) {
  const { direction } = options.value;
  if (direction === "left" || direction === "right") return;
  debouncedWheelMove(e.deltaY);
}

function touchStart(e: TouchEvent) {
  if (!canTouchScroll.value) return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const touch = e.targetTouches[0];
  const { waitTime, singleHeight, singleWidth } = options.value;
  startPos.value = {
    x: touch.pageX,
    y: touch.pageY,
  };
  startPosY.value = yPos.value;
  startPosX.value = xPos.value;
  if (!!singleHeight && !!singleWidth) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      scrollCancle();
    }, (waitTime as number) + 20);
  } else {
    scrollCancle();
  }
}

function touchMove(e: TouchEvent) {
  if (
    !canTouchScroll.value ||
    e.targetTouches.length > 1
  ) {
    return;
  }
  const touch = e.targetTouches[0];
  const { direction } = options.value;
  const endPos = {
    x: touch.pageX - (startPos.value?.x ?? 0),
    y: touch.pageY - (startPos.value?.y ?? 0),
  };
  e.preventDefault();
  const dir = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
  if (
    (dir === 1 && direction === "bottom") ||
    (dir === 1 && direction === "top")
  ) {
    yPos.value = (startPosY.value ?? 0) + endPos.y;
  } else if (
    (dir === 0 && direction === "left") ||
    (dir === 0 && direction === "right")
  ) {
    xPos.value = (startPosX.value ?? 0) + endPos.x;
  }
}

function touchEnd() {
  if (!canTouchScroll.value) return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const { direction } = options.value;
  delay.value = 50;
  if (direction === "top") {
    if (yPos.value > 0) yPos.value = 0;
  } else if (direction === "bottom") {
    const h = (realBoxHeight.value / 2) * -1;
    if (yPos.value < h) yPos.value = h;
  } else if (direction === "left") {
    if (xPos.value > 0) xPos.value = 0;
  } else if (direction === "right") {
    const w = realBoxWidth.value * -1;
    if (xPos.value < w) xPos.value = w;
  }
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    delay.value = 0;
    scrollMove();
  }, delay.value);
}

function enter() {
  if (hoverStopSwitch.value) scrollStopMove();
}

function leave() {
  if (hoverStopSwitch.value) scrollStartMove();
}

function scrollStartMove() {
  isHover.value = false;
  scrollMove();
}

function scrollStopMove() {
  isHover.value = true;
  if (singleWaitTime.value) clearTimeout(singleWaitTime.value);
  scrollCancle();
}

function scrollCancle() {
  cancelAnimationFrame(reqFrame.value!);
}

function reset() {
  xPos.value = 0;
  yPos.value = 0;
  scrollCancle();
  scrollInitMove();
}

function scrollMove() {
  if (isHover.value) return;
  reqFrame.value = requestAnimationFrame(() => {
    const h = realBoxHeight.value / 2;
    const w = realBoxWidth.value / 2;
    const { direction, waitTime } = options.value;
    if (direction === "top") {
      if (Math.abs(yPos.value) >= h) {
        emit("scrollEnd");
        yPos.value = 0;
      }
      yPos.value -= step.value;
    } else if (direction === "bottom") {
      if (yPos.value >= 0) {
        emit("scrollEnd");
        yPos.value = h * -1;
      }
      yPos.value += step.value;
    } else if (direction === "left") {
      if (Math.abs(xPos.value) >= w) {
        emit("scrollEnd");
        xPos.value = 0;
      }
      xPos.value -= step.value;
    } else if (direction === "right") {
      if (xPos.value > 0) {
        emit("scrollEnd");
        xPos.value = w * -1;
      }
      xPos.value += step.value;
    }
    if (singleWaitTime.value) clearTimeout(singleWaitTime.value);
    if (realSingleStopHeight.value) {
      if (Math.abs(yPos.value) % realSingleStopHeight.value < step.value) {
        singleWaitTime.value = setTimeout(() => {
          scrollMove();
        }, waitTime as number);
      } else {
        scrollMove();
      }
    } else if (realSingleStopWidth.value) {
      if (Math.abs(xPos.value) % realSingleStopWidth.value < step.value) {
        singleWaitTime.value = setTimeout(() => {
          scrollMove();
        }, waitTime as number);
      } else {
        scrollMove();
      }
    } else {
      scrollMove();
    }
  });
}

function scrollInitMove() {
  nextTick(() => {
    const { switchDelay } = options.value;
    copyHtml.value = "";
    const wrap = refMap.get(`wrap${props.classOption["key"]}`);
    const slotList = refMap.get(`slotList${props.classOption["key"]}`);
    const realBox = refMap.get(`realBox${props.classOption["key"]}`);
    if (isHorizontal.value) {
      height.value = wrap!.offsetHeight;
      width.value = wrap!.offsetWidth;
      let slotListWidth = slotList!.offsetWidth;
      if (autoPlay.value) {
        slotListWidth = slotListWidth * 2 + 1;
      }
      realBox!.style.width = slotListWidth + "px";
      realBoxWidth.value = slotListWidth;
    }
    if (autoPlay.value) {
      ease.value = "ease-in";
      delay.value = 0;
    } else {
      ease.value = "linear";
      delay.value = switchDelay as number;
      return;
    }
    if (scrollSwitch.value) {
      let timer: ReturnType<typeof setTimeout> | undefined;
      if (timer) clearTimeout(timer);
      copyHtml.value = slotList!.innerHTML;
      setTimeout(() => {
        realBoxHeight.value = realBox?.offsetHeight ?? 0;
        scrollMove();
      }, 0);
    } else {
      scrollCancle();
      yPos.value = 0;
      xPos.value = 0;
    }
  });
}

// lifecycle
onMounted(() => {
  scrollInitMove();
});

onUnmounted(() => {
  scrollCancle();
  if (singleWaitTime.value) clearTimeout(singleWaitTime.value);
});
</script>

<style lang="scss" scoped></style>
