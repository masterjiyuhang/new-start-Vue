<!-- eslint-disable vue/no-v-html -->
<template>
  <div :ref="(el) => setRef('wrap', el as HTMLElement)">
    <div
      v-if="navigation"
      :style="leftSwitch"
      :class="leftSwitchClass"
      @click="leftSwitchClick"
    >
      <slot name="left-switch"></slot>
    </div>
    <div
      v-if="navigation"
      :style="rightSwitch"
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
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <div :ref="(el) => setRef('slotList', el as HTMLElement)" :style="float">
        <slot></slot>
      </div>
      <div :style="float" v-html="copyHtml"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import type { CSSProperties } from "vue";
import { arrayIsEqual, copyObj } from "./utils";

interface ScrollOptions {
  step: number;
  limitMoveNum: number;
  hoverStop: boolean;
  direction: number;
  openTouch: boolean;
  singleHeight: number;
  singleWidth: number;
  waitTime: number;
  switchOffset: number;
  autoPlay: boolean;
  navigation: boolean;
  switchSingleStep: number;
  switchDelay: number;
  switchDisabledClass: string;
  isSingleRemUnit: boolean;
}

const props = defineProps<{
  data: unknown[];
  classOption: Record<string, unknown>;
}>();

const emit = defineEmits<{
  ScrollEnd: [];
}>();

// refMap for template refs
const refMap = new Map<string, HTMLElement>();
const setRef = (name: string, el: HTMLElement | null) => {
  if (el) refMap.set(name, el);
};

// Reactive state (from data())
const xPos = ref(0);
const yPos = ref(0);
const delay = ref(0);
const copyHtml = ref("");
const height = ref(0);
const width = ref(0);
const realBoxWidth = ref(0);

// Module-level variables (from beforeCreate + other non-reactive state)
let reqFrame: number | null = null;
let singleWaitTime: ReturnType<typeof setTimeout> | null = null;
let isHover = false;
const ease = ref("ease-in");
let realBoxHeight = 0;
let startPos = { x: 0, y: 0 };
let startPosY = 0;
let startPosX = 0;
let endPos = { x: 0, y: 0 };

// Computed properties
const defaultOption = computed<ScrollOptions>(() => ({
  step: 1, // 步长
  limitMoveNum: 5, // 启动无缝滚动最小数据数
  hoverStop: true, // 是否启用鼠标hover控制
  direction: 1, // 0 往下 1 往上 2向左 3向右
  openTouch: true, // 开启移动端touch
  singleHeight: 0, // 单条数据高度有值hoverStop关闭
  singleWidth: 0, // 单条数据宽度有值hoverStop关闭
  waitTime: 1000, // 单步停止等待时间
  switchOffset: 30,
  autoPlay: true,
  navigation: false,
  switchSingleStep: 134,
  switchDelay: 400,
  switchDisabledClass: "disabled",
  isSingleRemUnit: false, // singleWidth/singleHeight 是否开启rem度量
}));

const options = computed<ScrollOptions>(() =>
  copyObj({}, defaultOption.value, props.classOption) as unknown as ScrollOptions
);

const navigation = computed(() => options.value.navigation);

const autoPlay = computed(() => {
  if (navigation.value) return false;
  return options.value.autoPlay;
});

const scrollSwitch = computed(() => props.data.length >= options.value.limitMoveNum);

const hoverStopSwitch = computed(
  () => options.value.hoverStop && autoPlay.value && scrollSwitch.value
);

const canTouchScroll = computed(() => options.value.openTouch);

const isHorizontal = computed(() => options.value.direction > 1);

const baseFontSize = computed(() =>
  options.value.isSingleRemUnit
    ? parseInt(window.getComputedStyle(document.documentElement, null).fontSize, 10)
    : 1
);

const realSingleStopWidth = computed(() => options.value.singleWidth * baseFontSize.value);
const realSingleStopHeight = computed(() => options.value.singleHeight * baseFontSize.value);

const step = computed(() => {
  let singleStep: number;
  const stepVal = options.value.step;
  if (isHorizontal.value) {
    singleStep = realSingleStopWidth.value;
  } else {
    singleStep = realSingleStopHeight.value;
  }
  if (singleStep > 0 && singleStep % stepVal > 0) {
    console.error(
      "如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确。~~~~~"
    );
  }
  return stepVal;
});

const leftSwitchState = computed(() => xPos.value < 0);
const rightSwitchState = computed(() => Math.abs(xPos.value) < realBoxWidth.value - width.value);

const leftSwitchClass = computed(() =>
  leftSwitchState.value ? "" : options.value.switchDisabledClass
);
const rightSwitchClass = computed(() =>
  rightSwitchState.value ? "" : options.value.switchDisabledClass
);

const leftSwitch = computed((): CSSProperties => ({
  position: "absolute",
  margin: `${height.value / 2}px 0 0 -${options.value.switchOffset}px`,
  transform: "translate(-100%,-50%)",
}));

const rightSwitch = computed((): CSSProperties => ({
  position: "absolute",
  margin: `${height.value / 2}px 0 0 ${width.value + options.value.switchOffset}px`,
  transform: "translateY(-50%)",
}));

const float = computed((): CSSProperties =>
  isHorizontal.value
    ? { float: "left", overflow: "hidden" }
    : { overflow: "hidden" }
);

const pos = computed(() => ({
  transform: `translate(${xPos.value}px,${yPos.value}px)`,
  transition: `all ${ease.value} ${delay.value}ms`,
  overflow: "hidden",
}));

// Watch
watch(
  () => props.data,
  (newData, oldData) => {
    _dataWarm(newData);
    // 监听data是否有变更
    if (!arrayIsEqual(newData, oldData)) {
      reset();
    }
  }
);

watch(autoPlay, (bol) => {
  if (bol) {
    reset();
  } else {
    _stopMove();
  }
});

// Methods
function reset() {
  _cancle();
  _initMove();
}

function leftSwitchClick() {
  if (!leftSwitchState.value) return;
  // 小于单步距离
  if (Math.abs(xPos.value) < options.value.switchSingleStep) {
    xPos.value = 0;
    return;
  }
  xPos.value += options.value.switchSingleStep;
}

function rightSwitchClick() {
  if (!rightSwitchState.value) return;
  // 小于单步距离
  if (realBoxWidth.value - width.value + xPos.value < options.value.switchSingleStep) {
    xPos.value = width.value - realBoxWidth.value;
    return;
  }
  xPos.value -= options.value.switchSingleStep;
}

function _cancle() {
  cancelAnimationFrame(reqFrame ?? 0);
}

function touchStart(e: TouchEvent) {
  if (!canTouchScroll.value) return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const touch = e.targetTouches[0]; // touches数组对象获得屏幕上所有的touch，取第一个touch
  const { waitTime, singleHeight, singleWidth } = options.value;
  startPos = {
    x: touch.pageX,
    y: touch.pageY,
  }; // 取第一个touch的坐标值
  startPosY = yPos.value; // 记录touchStart时候的posY
  startPosX = xPos.value; // 记录touchStart时候的posX
  if (!!singleHeight && !!singleWidth) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      _cancle();
    }, waitTime + 20);
  } else {
    _cancle();
  }
}

function touchMove(e: TouchEvent) {
  // 当屏幕有多个touch或者页面被缩放过，就不执行move操作
  if (!canTouchScroll.value || e.targetTouches.length > 1) return;
  const touchScale = (e as unknown as { scale?: number }).scale;
  if (touchScale && touchScale !== 1) return;
  const touch = e.targetTouches[0];
  const { direction } = options.value;
  endPos = {
    x: touch.pageX - startPos.x,
    y: touch.pageY - startPos.y,
  };
  e.preventDefault(); // 阻止触摸事件的默认行为，即阻止滚屏
  const dir = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; // dir，1表示纵向滑动，0为横向滑动
  if (dir === 1 && direction < 2) {
    // 表示纵向滑动 && 运动方向为上下
    yPos.value = startPosY + endPos.y;
  } else if (dir === 0 && direction > 1) {
    // 为横向滑动 && 运动方向为左右
    xPos.value = startPosX + endPos.x;
  }
}

function touchEnd() {
  if (!canTouchScroll.value) return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const { direction } = options.value;
  delay.value = 50;
  if (direction === 1) {
    if (yPos.value > 0) yPos.value = 0;
  } else if (direction === 0) {
    const h = (realBoxHeight / 2) * -1;
    if (yPos.value < h) yPos.value = h;
  } else if (direction === 2) {
    if (xPos.value > 0) xPos.value = 0;
  } else if (direction === 3) {
    const w = realBoxWidth.value * -1;
    if (xPos.value < w) xPos.value = w;
  }
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    delay.value = 0;
    _move();
  }, delay.value);
}

function enter() {
  if (hoverStopSwitch.value) _stopMove();
}

function leave() {
  if (hoverStopSwitch.value) _startMove();
}

function _move() {
  // 鼠标移入时拦截_move()
  if (isHover) return;
  _cancle(); // 进入move立即先清除动画 防止频繁touchMove导致多动画同时进行
  reqFrame = requestAnimationFrame(() => {
    const h = realBoxHeight / 2; // 实际高度
    const w = realBoxWidth.value / 2; // 宽度
    const { direction, waitTime } = options.value;
    const stepVal = step.value;
    if (direction === 1) {
      // 上
      if (Math.abs(yPos.value) >= h) {
        emit("ScrollEnd");
        yPos.value = 0;
      }
      yPos.value -= stepVal;
    } else if (direction === 0) {
      // 下
      if (yPos.value >= 0) {
        emit("ScrollEnd");
        yPos.value = h * -1;
      }
      yPos.value += stepVal;
    } else if (direction === 2) {
      // 左
      if (Math.abs(xPos.value) >= w) {
        emit("ScrollEnd");
        xPos.value = 0;
      }
      xPos.value -= stepVal;
    } else if (direction === 3) {
      // 右
      if (xPos.value >= 0) {
        emit("ScrollEnd");
        xPos.value = w * -1;
      }
      xPos.value += stepVal;
    }
    if (singleWaitTime) clearTimeout(singleWaitTime);
    if (realSingleStopHeight.value) {
      // 是否启动了单行暂停配置
      if (Math.abs(yPos.value) % realSingleStopHeight.value < stepVal) {
        // 符合条件暂停waitTime
        singleWaitTime = setTimeout(() => {
          _move();
        }, waitTime);
      } else {
        _move();
      }
    } else if (realSingleStopWidth.value) {
      if (Math.abs(xPos.value) % realSingleStopWidth.value < stepVal) {
        // 符合条件暂停waitTime
        singleWaitTime = setTimeout(() => {
          _move();
        }, waitTime);
      } else {
        _move();
      }
    } else {
      _move();
    }
  });
}

function _initMove() {
  nextTick(() => {
    const { switchDelay } = options.value;
    const autoPlayVal = autoPlay.value;
    const isHorizontalVal = isHorizontal.value;
    _dataWarm(props.data);
    copyHtml.value = ""; // 清空copy
    if (isHorizontalVal) {
      const wrapEl = refMap.get("wrap")!;
      height.value = wrapEl.offsetHeight;
      width.value = wrapEl.offsetWidth;
      let slotListWidth = refMap.get("slotList")!.offsetWidth;
      // 水平滚动设置warp width
      if (autoPlayVal) {
        // 修正offsetWidth四舍五入
        slotListWidth = slotListWidth * 2 + 1;
      }
      refMap.get("realBox")!.style.width = `${slotListWidth}px`;
      realBoxWidth.value = slotListWidth;
    }

    if (autoPlayVal) {
      ease.value = "ease-in";
      delay.value = 0;
    } else {
      ease.value = "linear";
      delay.value = switchDelay;
      return;
    }

    // 是否可以滚动判断
    if (scrollSwitch.value) {
      let timer: ReturnType<typeof setTimeout> | undefined;
      if (timer) clearTimeout(timer);
      copyHtml.value = refMap.get("slotList")!.innerHTML;
      setTimeout(() => {
        realBoxHeight = refMap.get("realBox")!.offsetHeight;
        _move();
      }, 0);
    } else {
      _cancle();
      yPos.value = 0;
      xPos.value = 0;
    }
  });
}

function _dataWarm(data: unknown[]) {
  if (data.length > 100) {
    console.warn(
      `数据达到了${data.length}条有点多哦~,可能会造成部分老旧浏览器卡顿。`
    );
  }
}

function _startMove() {
  isHover = false; // 开启_move
  _move();
}

function _stopMove() {
  isHover = true; // 关闭_move
  // 防止频频hover进出单步滚动,导致定时器乱掉
  if (singleWaitTime) clearTimeout(singleWaitTime);
  _cancle();
}

// Lifecycle
onMounted(() => {
  _initMove();
});

onUnmounted(() => {
  _cancle();
  if (singleWaitTime) clearTimeout(singleWaitTime);
});
</script>
