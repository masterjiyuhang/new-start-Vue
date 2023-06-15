<template>
  <div class="turntable-wrap">
    <div class="turntable-bg">
      <div class="light"></div>
      <div class="pointer" @click="gameStart"></div>
      <div class="turntable" ref="turntable">
        <!-- <h1>asdqwe -{{ turntable }}</h1> -->
        <ul class="prize" v-if="turntable && turntable.length">
          <li v-for="(item, index) in turntable" :key="index">
            <img
              class="img"
              :src="item.type == turntableFail ? turntableFailImg : item.icon"
            />
          </li>
        </ul>
      </div>
      <div class="decorate1"></div>
      <div class="decorate2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import turntableFailImg from "@/assets/images/404.png";

const gameStart = () => {};

const turntableFail = ref(2);
const turntable = reactive([
  {
    location: 1, // 位置 1-6
    type: 1, // 抽奖类型 1：活动 2：未中奖
    icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 20, // 中奖概率 1-100
  },
  {
    location: 2, // 位置 1-6
    type: 2, // 抽奖类型 1：活动 2：未中奖
    icon: "", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 20, // 中奖概率 1-100
  },
  {
    location: 3, // 位置 1-6
    type: 2, // 抽奖类型 1：活动 2：未中奖
    icon: "", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 20, // 中奖概率 1-100
  },
  {
    location: 4, // 位置 1-6
    type: 2, // 抽奖类型 1：活动 2：未中奖
    icon: "", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 20, // 中奖概率 1-100
  },
  {
    location: 5, // 位置 1-6
    type: 2, // 抽奖类型 1：活动 2：未中奖
    icon: "", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 10, // 中奖概率 1-100
  },
  {
    location: 6, // 位置 1-6
    type: 2, // 抽奖类型 1：活动 2：未中奖
    icon: "", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 10, // 中奖概率 1-100
  },
]);
</script>

<style lang="scss" scoped>
.turntable-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  // height: 100%;
  background-color: #f80;

  .turntable-bg {
    position: relative;
    z-index: 2;
    margin: auto;
    width: 840px;
    height: 1111px;
    background: url("@/assets/luckyDraw/turntable-bg.png") no-repeat 100% 100%;
    background-size: contain;
    background-position: center;
    .light {
      position: absolute;
      top: 4px;
      left: 0px;
      width: 822px;
      height: 830px;
      margin: auto;
      background: url("@/assets/luckyDraw/light.png") no-repeat 100% 100%;
      background-size: contain;
      animation: rotate 15s linear infinite;
    }
    .pointer {
      position: absolute;
      top: 255px;
      left: 310px;
      z-index: 1;
      width: 206px;
      height: 268px;
      background: url("@/assets/luckyDraw/turntable-pointer.png") no-repeat 100%
        100%;
      background-size: contain;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent; // 点击无阴影
    }

    .turntable {
      position: absolute;
      top: 45px;
      left: 48px;
      width: 746px;
      height: 746px;
      transform: rotate(0deg);
      background: url("@/assets/luckyDraw/turntable.png") no-repeat 100% 100%;
      background-size: contain;
      .prize {
        position: absolute;
        top: 130px;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 500px;
        height: 500px;
        transform: rotate(-15deg);
        li {
          position: absolute;
          top: 0;
          left: 0;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          color: #000;
          text-align: center;
          line-height: 250px;
          transform-origin: right bottom;
          &:nth-child(1) {
            transform: rotate(60deg);
          }
          &:nth-child(2) {
            transform: rotate(120deg);
          }
          &:nth-child(3) {
            transform: rotate(180deg);
          }
          &:nth-child(4) {
            transform: rotate(240deg);
          }
          &:nth-child(5) {
            transform: rotate(300deg);
          }
          &:nth-child(6) {
            transform: rotate(360deg);
          }
          .img {
            display: block;
            width: 150px;
            height: 150px;
            border: 0;
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
