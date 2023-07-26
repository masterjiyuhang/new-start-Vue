<template>
  <div :ref="`wrap${classOption['key']}`">
    <div
      :ref="'realBox' + classOption['key']"
      :style="pos"
      @mouseenter="enter"
      @mouseleave="leave"
      @touchstart.passive="touchStart"
      @touchmove.passive="touchMove"
      @touchend="touchEnd"
      @mousewheel.passive="wheel"
    >
      <div :ref="'slotList' + classOption['key']" :style="float">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { options } from "floating-vue";
import * as utilsMethods from "./utils";
const { animationFrame, copyObj } = utilsMethods;

export default {
  name: "CchScroll",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    classOption: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      xPos: 0,
      yPos: 0,
      delay: 0,
      height: 0,
      width: 0,

      realBoxWidth: 0,
      realBoxHeight: 0,

      singleWaitTime: null,

      reqFrame: null,
      startPos: null,
      startPosX: null,
      startPosY: null,
      isHover: false,

      ease: "ease-in",
    };
  },
  computed: {
    defaultOption() {
      return {
        //步长
        step: 1,
        //启动无缝滚动最小数据数
        limitMoveNum: 5,
        //是否启用鼠标hover控制
        hoverStop: true,
        // bottom 往下 top 往上(默认) left 向左 right 向右
        direction: "top",
        //开启移动端touch
        openTouch: true,
        //单条数据高度有值hoverStop关闭
        singleHeight: 0,
        //单条数据宽度有值hoverStop关闭
        singleWidth: 0,
        //单步停止等待时间
        waitTime: 1000,
        switchOffset: 30,
        autoPlay: true,
        navigation: false,
        switchSingleStep: 134,
        switchDelay: 400,
        switchDisabledClass: "disabled",
        // singleWidth/singleHeight 是否开启rem度量
        isSingleRemUnit: false,
      };
    },
    options() {
      return copyObj({}, this.classOption);
    },

    leftSwitchState() {
      return this.xPos < 0;
    },

    rightSwitchState() {
      return Math.abs(this.xPos) < this.realBoxWidth - this.width;
    },

    leftSwitchClass() {
      return this.leftSwitchState ? "" : options.switchDisabledClass;
    },

    rightSwitchClass() {
      return this.rightSwitchState ? "" : options.switchDisabledClass;
    },

    leftSwitch() {
      return {
        position: "absolute",
        margin: `${this.height / 2}px 0 0 -${this.options.switchOffset}px`,
        transform: "translate(-100%,-50%)",
      };
    },

    rightSwitch() {
      return {
        position: "absolute",
        margin: `${this.height / 2}px 0 0 ${
          this.width + this.options.switchOffset
        }px`,
        transform: "translateY(-50%)",
      };
    },

    isHorizontal() {
      return (
        this.options.direction !== "bottom" && this.options.direction !== "top"
      );
    },

    float() {
      return this.isHorizontal
        ? { float: "left", overflow: "hidden" }
        : { overflow: "hidden" };
    },

    pos() {
      return {
        transform: `translate(${this.xPos}px,${this.yPos}px)`,
        transition: `all ${this.ease} ${this.delay}ms`,
        overflow: "hidden",
      };
    },

    navigation() {
      return this.options.navigation;
    },

    autoPlay() {
      if (this.navigation) {
        return false;
      } else {
        return this.options.autoPlay;
      }
    },

    scrollSwitch() {
      return this.data.length 
    }
  },

  mounted() {
    this.scrollInitMove();
    console.log(this.classOption);
  },

  methods: {
    enter() {},
    leave() {},
    touchStart() {},
    touchMove() {},
    touchEnd() {},
    wheel() {},

    reset() {
      this.xPos = 0;
      this.yPos = 0;
      this.scrollCancle();
      this.scrollInitMove();
    },

    scrollInitMove() {
      this.$nextTick(() => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
