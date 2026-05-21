<!-- eslint-disable vue/no-v-html -->
<template>
  <div :ref="(el) => setRef('wrap', el as HTMLElement)">
    <div
      :style="leftSwitch"
      v-if="navigation"
      :class="leftSwitchClass"
      @click="leftSwitchClick"
    >
      <slot name="left-switch"></slot>
    </div>
    <div
      :style="rightSwitch"
      v-if="navigation"
      :class="rightSwitchClass"
      @click="rightSwitchClick"
    >
      <slot name="right-switch"></slot>
    </div>
    <div
      :ref="(el) => setRef('realBox', el as HTMLElement)"
      :style="pos"
      @mouseenter="enter"
      @mouseleave="leave"
      @touchstart.passive="touchStart"
      @touchmove.passive="touchMove"
      @touchend="touchEnd"
      @mousewheel.passive="wheel"
    >
      <div :ref="(el) => setRef('slotList', el as HTMLElement)" :style="float">
        <slot></slot>
      </div>
      <div v-html="copyHtml" :style="float"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import type { CSSProperties } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { copyObj } from "./utils";

interface ScrollOptions {
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
  key?: number;
}

const props = defineProps<{
  data: unknown[];
  classOption?: ScrollOptions;
}>();

const emit = defineEmits<{
  scrollEnd: [];
}>();

const option = computed<Required<ScrollOptions>>(() =>
  copyObj(
    {},
    {
      step: 1,
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
      key: 0,
    },
    props.classOption ?? {},
  ) as Required<ScrollOptions>,
);

const xPos = ref(0);
const yPos = ref(0);
const delay = ref(0);
const height = ref(0);
const width = ref(0);
const realBoxWidth = ref(0);
const realBoxHeight = ref(0);
const copyHtml = ref("");
const isHover = ref(false);
const ease = ref("ease-in");
let singleWaitTime: ReturnType<typeof setTimeout> | null = null;
let reqFrame: number | null = null;
let startPos: { x: number; y: number } | null = null;
let startPosY = 0;
let startPosX = 0;

const refMap = new Map<string, HTMLElement>();
const setRef = (name: string, el: HTMLElement | null) => {
  if (el) refMap.set(name, el);
};

const leftSwitchState = computed(() => xPos.value < 0);

const rightSwitchState = computed(
  () => Math.abs(xPos.value) < realBoxWidth.value - width.value,
);

const leftSwitchClass = computed(() =>
  leftSwitchState.value ? "" : option.value.switchDisabledClass,
);

const rightSwitchClass = computed(() =>
  rightSwitchState.value ? "" : option.value.switchDisabledClass,
);

const leftSwitch = computed((): CSSProperties => ({
  position: "absolute",
  margin: `${height.value / 2}px 0 0 -${option.value.switchOffset}px`,
  transform: "translate(-100%,-50%)",
}));

const rightSwitch = computed((): CSSProperties => ({
  position: "absolute",
  margin: `${height.value / 2}px 0 0 ${width.value + option.value.switchOffset}px`,
  transform: "translateY(-50%)",
}));

const isHorizontal = computed(
  () => option.value.direction !== "bottom" && option.value.direction !== "top",
);

const float = computed((): CSSProperties =>
  isHorizontal.value
    ? { float: "left", overflow: "hidden" }
    : { overflow: "hidden" },
);

const pos = computed(() => ({
  transform: `translate(${xPos.value}px,${yPos.value}px)`,
  transition: `all ${ease.value} ${delay.value}ms`,
  overflow: "hidden",
}));

const navigation = computed(() => option.value.navigation);

const autoPlay = computed(() => {
  if (navigation.value) return false;
  return option.value.autoPlay;
});

const scrollSwitch = computed(
  () => props.data.length >= option.value.limitMoveNum,
);

const hoverStopSwitch = computed(
  () => option.value.hoverStop && autoPlay.value && scrollSwitch.value,
);

const canTouchScroll = computed(() => option.value.openTouch);

const baseFontSize = computed(() =>
  option.value.isSingleRemUnit
    ? parseInt(window.getComputedStyle(document.documentElement).fontSize)
    : 1,
);

const realSingleStopWidth = computed(
  () => option.value.singleWidth * baseFontSize.value,
);

const realSingleStopHeight = computed(
  () => option.value.singleHeight * baseFontSize.value,
);

const step = computed(() => {
  const stepVal = option.value.step;
  const singleStep = isHorizontal.value
    ? realSingleStopWidth.value
    : realSingleStopHeight.value;
  if (singleStep > 0 && singleStep % stepVal > 0) {
    console.error(
      "如果设置了单步滚动，step需是单步大小的约数，否则无法保证单步滚动结束的位置是否准确",
    );
  }
  return stepVal;
});

function reset() {
  xPos.value = 0;
  yPos.value = 0;
  scrollCancle();
  scrollInitMove();
}

function leftSwitchClick() {
  if (!leftSwitchState.value) return;
  if (Math.abs(xPos.value) < option.value.switchSingleStep) {
    xPos.value = 0;
    return;
  }
  xPos.value += option.value.switchSingleStep;
}

function rightSwitchClick() {
  if (!rightSwitchState.value) return;
  if (
    realBoxWidth.value - width.value + xPos.value <
    option.value.switchSingleStep
  ) {
    xPos.value = width.value - realBoxWidth.value;
    return;
  }
  xPos.value -= option.value.switchSingleStep;
}

function scrollCancle() {
  if (reqFrame != null) cancelAnimationFrame(reqFrame);
}

function touchStart(e: TouchEvent) {
  if (!canTouchScroll.value) return;
  const touch = e.targetTouches[0];
  const { waitTime, singleHeight, singleWidth } = option.value;
  startPos = { x: touch.pageX, y: touch.pageY };
  startPosY = yPos.value;
  startPosX = xPos.value;
  if (singleHeight && singleWidth) {
    if (singleWaitTime) clearTimeout(singleWaitTime);
    singleWaitTime = setTimeout(() => {
      scrollCancle();
    }, waitTime + 20);
  } else {
    scrollCancle();
  }
}

function touchMove(e: TouchEvent) {
  if (!canTouchScroll.value || e.targetTouches.length > 1) return;
  const touch = e.targetTouches[0];
  const { direction } = option.value;
  const endPos = {
    x: touch.pageX - startPos!.x,
    y: touch.pageY - startPos!.y,
  };
  e.preventDefault();
  const dir = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
  if (
    (dir === 1 && direction === "bottom") ||
    (dir === 1 && direction === "top")
  ) {
    yPos.value = startPosY + endPos.y;
  } else if (
    (dir === 0 && direction === "left") ||
    (dir === 0 && direction === "right")
  ) {
    xPos.value = startPosX + endPos.x;
  }
}

function touchEnd() {
  if (!canTouchScroll.value) return;
  const { direction } = option.value;
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
  setTimeout(() => {
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

function scrollMove() {
  if (isHover.value) return;
  reqFrame = requestAnimationFrame(() => {
    const h = realBoxHeight.value / 2;
    const w = realBoxWidth.value / 2;
    const { direction, waitTime } = option.value;

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
      if (xPos.value >= 0) {
        emit("scrollEnd");
        xPos.value = w * -1;
      }
      xPos.value += step.value;
    }

    if (singleWaitTime) clearTimeout(singleWaitTime);
    if (realSingleStopHeight.value) {
      if (Math.abs(yPos.value) % realSingleStopHeight.value < step.value) {
        singleWaitTime = setTimeout(() => scrollMove(), waitTime);
      } else {
        scrollMove();
      }
    } else if (realSingleStopWidth.value) {
      if (Math.abs(xPos.value) % realSingleStopWidth.value < step.value) {
        singleWaitTime = setTimeout(() => scrollMove(), waitTime);
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
    const { switchDelay } = option.value;
    copyHtml.value = "";
    const wrapEl = refMap.get("wrap");
    const slotListEl = refMap.get("slotList");
    const realBoxEl = refMap.get("realBox");

    if (isHorizontal.value && wrapEl && slotListEl && realBoxEl) {
      height.value = wrapEl.offsetHeight;
      width.value = wrapEl.offsetWidth;
      let slotListWidth = slotListEl.offsetWidth;
      if (autoPlay.value) {
        slotListWidth = slotListWidth * 2 + 1;
      }
      realBoxEl.style.width = slotListWidth + "px";
      realBoxWidth.value = slotListWidth;
    }

    if (autoPlay.value) {
      ease.value = "ease-in";
      delay.value = 0;
    } else {
      ease.value = "linear";
      delay.value = switchDelay;
      return;
    }

    if (scrollSwitch.value && slotListEl && realBoxEl) {
      copyHtml.value = slotListEl.innerHTML;
      setTimeout(() => {
        realBoxHeight.value = realBoxEl.offsetHeight;
        scrollMove();
      }, 0);
    } else {
      scrollCancle();
      yPos.value = 0;
      xPos.value = 0;
    }
  });
}

function scrollStartMove() {
  isHover.value = false;
  scrollMove();
}

function scrollStopMove() {
  isHover.value = true;
  if (singleWaitTime) clearTimeout(singleWaitTime);
  scrollCancle();
}

const debouncedWheel = useDebounceFn(
  (e: WheelEvent) => {
    e.deltaY > 0
      ? (yPos.value -= step.value)
      : (yPos.value += step.value);
  },
  50,
);

function wheel(e: WheelEvent) {
  const { direction } = option.value;
  if (direction === "left" || direction === "right") return;
  debouncedWheel(e);
}

onMounted(() => {
  scrollInitMove();
});

onUnmounted(() => {
  scrollCancle();
  if (singleWaitTime) clearTimeout(singleWaitTime);
});

defineExpose({ reset });
</script>
