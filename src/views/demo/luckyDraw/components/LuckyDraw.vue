<template>
  <div class="lucky-draw-wrap">
    <div class="lucky-draw-wrap__bg w-[840px] h-[1111px]">
      <div class="light"></div>
      <div class="pointer" @click="gameStart"></div>

      <div class="turntable" ref="turntableRef">
        <ul class="prize">
          <li v-for="(item, index) in turntableList" :key="index">
            <img
              class="img"
              :src="item.type == turntableFail ? turntableFailImg : item.icon"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { lists } from "./constant";
import turntableFailImg from "@/assets/images/404.png";

const transformCss = "transform";
const transformJs = "transform";
const transition = "transition";
const transitionend = "transitionend";

const turntableRef = ref();
const turntableSuccess = ref(1);
const turntableFail = ref(2);

const isRunning = ref(false);

const turntableList = reactive([...lists]);
const gameStart = () => {
  if (turntableRef.value && !turntableList.length) return;

  if (isRunning.value) return;

  setTimeout(() => {
    startRun();
  }, 200);
};

const startRun = () => {
  console.log("start running");
  isRunning.value = true;

  let transformDeg = turntableRef.value.style[transformJs];
  let deg = transformDeg.match(/([-]?\d*)deg/)
    ? transformDeg.match(/([-]?\d*)deg/)[1]
    : 0;
  deg = parseInt(deg);
  console.log(deg, "turntableRef...");
  let interval = setInterval(() => {
    deg += 2;
    deg = deg % 360;
    turntableRef.value.style[transformJs] = `rotate(${deg}deg)`;
  }, 1);

  // 2.随机生成中奖结果
  let randNum: any = parseInt(Math.random() * 100 + "") + 1;

  console.log(randNum, "随机中奖结果");
  let count = 0;
  turntableList.map((item: any) => {
    item.min = count;
    count += Number(item.rate);
    item.max = count;
  });

  console.log(turntableList);
  let randomRes = turntableList.filter((item: any) => {
    return randNum > item.min && randNum <= item.max;
  })[0];

  console.log(randomRes, "randomRes");

  // 若中奖没有中奖图片，则为未中奖
  if (randomRes.type === turntableSuccess.value && !randomRes.result_img) {
    randomRes = turntableList.filter(
      (item) => Number(item.type) === turntableFail.value
    )[0];
  }
  clearInterval(interval);

  // 3.计算转动角度
  transformDeg = turntableRef.value.style[transformJs];
  let lastDeg = transformDeg.match(/([-]?\d*)deg/)
    ? transformDeg.match(/([-]?\d*)deg/)[1]
    : 0;
  lastDeg = parseInt(lastDeg);

  let finallyDeg = randomRes.location * -60 + 360 * 4 + 60;
  turntableRef.value.style[transformJs] = `rotate(${finallyDeg}deg)`;

  let transTime = parseFloat((finallyDeg - lastDeg) / 360 + "").toFixed(1);

  turntableRef.value.style[
    transition
  ] = `${transformCss} ${transTime}s ease-out`;

  // 4. 转动结束后执行
  let runEnd = () => {
    turntableRef.value.style[transition] = `${transformCss} 0s`;
    let transformDeg = turntableRef.value.style[transformJs];
    let deg = transformDeg.match(/([-]?\d*)deg/)
      ? transformDeg.match(/([-]?\d*)deg/)[1]
      : 0;
    deg = parseInt(deg);
    deg = deg % 360;
    turntableRef.value.style[transformJs] = `rotate(${deg}deg)`;

    // // 5. 显示中奖结果
    // if (Number(randomRes.type) === turntableSuccess.value) {
    //   dialogConfig.title = "中奖啦";
    //   dialogConfig.resultText = "请扫码领取";
    //   dialogConfig.destoryTime = 15;
    // } else {
    //   dialogConfig.title = "没抽中";
    //   dialogConfig.resultText = "真不巧，没抽中！";
    //   dialogConfig.destoryTime = 3;
    // }
    // dialogConfig.show = true;
    // dialogConfig.resultImg = randomRes.result_img;
    // dialogRef.countDown() // 倒计时
    setTimeout(() => {
      isRunning.value = false;
      turntableRef.value.removeEventListener(transitionend, runEnd);
    }, 3 * 1000);
  };
  turntableRef.value.addEventListener(transitionend, runEnd);
};
</script>

<style lang="scss" scoped>
.lucky-draw-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #f80;

  &__bg {
    position: relative;
    width: 420px;
    height: 550px;
    z-index: 2;
    background: url("@/assets/luckyDraw/turntable-bg.png") no-repeat 100% 100%;
    background-size: contain;
    background-position: center;
    margin: auto;

    .light {
      width: 411px;
      height: 415px;
      background: url("@/assets/luckyDraw/light.png") no-repeat 100% 100%;
      background-size: contain;
      animation: rotate 15s linear infinite;
    }

    .pointer {
      position: absolute;
      top: 122px;
      left: 38%;
      z-index: 1;
      width: 103px;
      height: 134px;
      background: url("@/assets/luckyDraw/turntable-pointer.png") no-repeat 100%
        100%;
      background-size: contain;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent; // 点击无阴影
    }

    .turntable {
      position: absolute;
      top: 16px;
      left: 6%;
      width: 373px;
      height: 373px;
      transform: rotate(0deg);
      background: url("@/assets/luckyDraw/turntable.png") no-repeat 100% 100%;
      background-size: contain;

      .prize {
        position: absolute;
        top: 65px;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 250px;
        height: 250px;
        transform: rotate(-15deg);
        li {
          position: absolute;
          top: 0;
          left: 0;
          width: 125px;
          height: 125px;
          border-radius: 50%;
          color: #000;
          text-align: center;
          line-height: 125px;
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
            width: 75px;
            height: 75px;
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
