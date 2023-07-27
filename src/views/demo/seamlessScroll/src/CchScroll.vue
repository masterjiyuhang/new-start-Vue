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
      <div v-html="copyHtml" :style="float" />
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
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
  emits: ["scrollEnd"],
  expose: ["reset"],

  data() {
    return {
      xPos: 0,
      yPos: 0,
      delay: 0,
      height: 0,
      width: 0,

      realBoxWidth: 0,
      realBoxHeight: 0,

      copyHtml: "",

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
        step: 1.3,
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
      return copyObj({}, this.defaultOption, this.classOption);
    },

    leftSwitchState() {
      return this.xPos < 0;
    },

    rightSwitchState() {
      return Math.abs(this.xPos) < this.realBoxWidth - this.width;
    },

    leftSwitchClass() {
      return this.leftSwitchState ? "" : this.options.switchDisabledClass;
    },

    rightSwitchClass() {
      return this.rightSwitchState ? "" : this.options.switchDisabledClass;
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

    hoverStopSwitch() {
      return this.options.hoverStop && this.autoPlay && this.scrollSwitch;
    },

    canTouchScroll() {
      return this.options.openTouch;
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
      return this.data.length > this.options.limitMoveNum;
    },

    baseFontSize() {
      return this.options.isSingleRemUnit
        ? parseInt(
            window.getComputedStyle(document.documentElement, null).fontSize
          )
        : 1;
    },

    realSingleStopWidth() {
      return this.options.singleWidth * this.baseFontSize;
    },

    realSingleStopHeight() {
      return this.options.singleHeight * this.baseFontSize;
    },

    step() {
      let singleStep;
      const step = this.options.step;
      if (this.isHorizontal) {
        singleStep = this.realSingleStopWidth;
      } else {
        singleStep = this.realSingleStopHeight;
      }
      if (singleStep > 0 && singleStep % step > 0) {
        throw "如果设置了单步滚动，step需是单步大小的约数，否则无法保证单步滚动结束的位置是否准确";
      }
      return step;
    },
  },

  created() {
    animationFrame();
  },

  mounted() {
    this.scrollInitMove();
  },
  unmounted() {
    this.scrollCancle();
    clearTimeout(this.singleWaitTime);
  },

  methods: {
    // 鼠标滚轮事件
    wheel(e) {
      const { direction } = this.options;
      if (direction === "left" || direction === "right") {
        return;
      }
      console.log("鼠标滚动事件");

      debounce(() => {
        e.deltaY > 0 ? (this.yPos -= this.step) : (this.yPos += this.step);
      }, 50)();
    },

    leftSwitchClick() {
      if (!this.leftSwitchState) return;

      // 小于单步距离
      if (Math.abs(this.xPos) < this.options.switchSingleStep) {
        this.xPos = 0;
        return;
      }
      this.xPos += this.options.switchSingleStep;
    },

    rightSwitchClick() {
      if (!this.rightSwitchState) return;
      // 小于单步距离

      if (
        this.realBoxWidth - this.width + this.xPos <
        this.options.switchSingleStep
      ) {
        this.xPos = this.width - this.realBoxWidth;
        return;
      }
      this.xPos -= this.options.switchSingleStep;
    },

    touchStart(e) {
      if (!this.canTouchScroll) return;

      let timer;

      const touch = e.targetTouches[0];
      const { waitTime, singleHeight, singleWidth } = this.options;

      this.startPos = {
        x: touch.pageX,
        y: touch.pageY,
      };

      this.startPosY = this.yPos;
      this.startPosX = this.xPos;

      if (!!singleHeight && !!singleWidth) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          this.scrollCancle();
        }, waitTime + 20);
      } else {
        this.scrollCancle();
      }
    },

    touchMove(e) {
      // 当屏幕有多个touch或者页面被缩放过，就不执行move操作
      if (
        !this.canTouchScroll ||
        e.targetTouches.length > 1 ||
        (e.scale && e.scale !== 1)
      ) {
        return;
      }

      const touch = e.targetTouches[0];
      const { direction } = this.options;
      const endPos = {
        x: touch.pageX - this.startPos.x,
        y: touch.pageY - this.startPos.y,
      };
      // 阻止触摸事件的默认行为，即阻止滚屏
      e.preventDefault();

      // dir，1表示纵向滑动，0为横向滑动
      const dir = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;

      if (
        (dir === 1 && direction === "bottom") ||
        (dir === 1 && direction === "top")
      ) {
        // 表示纵向滑动 && 运动方向为上下
        this.yPos = this.startPosY + endPos.y;
      } else if (
        (dir === 0 && direction === "left") ||
        (dir === 0 && direction === "right")
      ) {
        // 为横向滑动 && 运动方向为左右
        this.xPos = this.startPosX + endPos.x;
      }
    },

    touchEnd() {
      if (!this.canTouchScroll) return;
      let timer;
      const { direction } = this.options;
      this.delay = 50;

      if (direction === "top") {
        if (this.yPos > 0) this.yPos = 0;
      } else if (direction === "bottom") {
        const h = (this.realBoxHeight / 2) * -1;
        if (this.yPos < h) this.yPos = h;
      } else if (direction === "left") {
        if (this.xPos > 0) this.xPos = 0;
      } else if (direction === "right") {
        const w = this.realBoxWidth * -1;
        if (this.xPos < w) this.xPos = w;
      }

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.delay = 0;
        this.scrollMove();
      }, this.delay);
    },

    enter() {
      if (this.hoverStopSwitch) this.scrollStopMove();
    },

    leave() {
      if (this.hoverStopSwitch) this.scrollStartMove();
    },

    scrollStartMove() {
      this.isHover = false;
      this.scrollMove();
    },

    scrollStopMove() {
      this.isHover = true;
      // 防止频频hover进出单步滚动,导致定时器乱掉
      if (this.singleWaitTime) clearTimeout(this.singleWaitTime);
      this.scrollCancle();
    },

    scrollCancle() {
      cancelAnimationFrame(this.reqFrame);
    },

    reset() {
      this.xPos = 0;
      this.yPos = 0;
      this.scrollCancle();
      this.scrollInitMove();
    },

    scrollMove() {
      // 鼠标移入时拦截scrollMove()
      if (this.isHover) return;

      this.reqFrame = requestAnimationFrame(() => {
        const h = this.realBoxHeight / 2;
        const w = this.realBoxWidth / 2;

        const { direction, waitTime } = this.options;

        if (direction === "top") {
          if (Math.abs(this.yPos) >= h) {
            this.$emit("scrollEnd");
            this.yPos = 0;
          }
          this.yPos -= this.step;
        } else if (direction === "bottom") {
          if (this.yPos >= 0) {
            this.$emit("scrollEnd");
            this.yPos = h * -1;
          }
          this.yPos += this.step;
        } else if (direction === "left") {
          if (Math.abs(this.xPos) >= w) {
            this.$emit("scrollEnd");
            this.xPos = 0;
          }
          this.xPos -= this.step;
        } else if (direction === "right") {
          if (this.xPos > 0) {
            this.$emit("scrollEnd");
            this.xPos = w * -1;
          }
          this.xPos += this.step;
        }

        if (this.singleWaitTime) clearTimeout(this.singleWaitTime);

        if (this.realSingleStopHeight) {
          // 是否启动了单行暂停配置
          if (Math.abs(this.yPos) % this.realSingleStopHeight < this.step) {
            this.singleWaitTime = setTimeout(() => {
              this.scrollMove();
            }, waitTime);
          } else {
            this.scrollMove();
          }
        } else if (this.realSingleStopWidth) {
          if (Math.abs(this.xPos) % this.realSingleStopWidth < this.step) {
            this.singleWaitTime = setTimeout(() => {
              this.scrollMove();
            }, waitTime);
          } else {
            this.scrollMove();
          }
        } else {
          this.scrollMove();
        }
      });
    },

    scrollInitMove() {
      this.$nextTick(() => {
        const { switchDelay } = this.options;
        this.copyHtml = "";
        const wrap = this.$refs[`wrap${this.classOption["key"]}`];
        const slotList = this.$refs[`slotList${this.classOption["key"]}`];
        const realBox = this.$refs[`realBox${this.classOption["key"]}`];

        // console.log(wrap, slotList, realBox);
        if (this.isHorizontal) {
          this.height = wrap.offsetHeight;
          this.width = wrap.offsetWidth;
          let slotListWidth = slotList.offsetWidth;

          // 水平滚动设置warp width
          if (this.autoPlay) {
            slotListWidth = slotListWidth * 2 + 1;
          }

          realBox.style.width = slotListWidth + "px";

          this.realBoxWidth = slotListWidth;
        }

        if (this.autoPlay) {
          this.ease = "ease-in";
          this.delay = 0;
        } else {
          this.ease = "linear";
          this.delay = switchDelay;
          return;
        }
        // 是否可以滚动判断
        if (this.scrollSwitch) {
          let timer;
          if (timer) clearTimeout(timer);

          this.copyHtml = slotList.innerHTML;

          setTimeout(() => {
            this.realBoxHeight = realBox?.offsetHeight;
            this.scrollMove();
          }, 0);
        } else {
          this.scrollCancle();
          this.yPos = 0;
          this.xPos = 0;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
