<template>
  <div class="turntable-wrap">
    <div class="turntable-bg">
      <div class="light"></div>
      <div class="pointer" @click="gameStart"></div>
      <div class="turntable" ref="turntableRef">
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

    <!-- <Dialog :dialog="dialogConfig" ref="dialogRef" /> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import turntableFailImg from "@/assets/images/404.png";

const transformCss = "transform";
const transformJs = "transform";
const transition = "transition";
const transitionend = "transitionend";

const gameStart = () => {
  if (turntableRef.value && !turntable.length) return;

  if (isRunning.value) return;

  setTimeout(() => {
    startRun();
  }, 200);
};

const startRun = () => {
  console.log("start running");
  isRunning.value = true;

  // 1.转盘匀速转动
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
  let randNum = parseInt(Math.random() * 100 + "") + 1;
  let count = 0;
  turntable.map((item: any) => {
    item.min = count;
    count += Number(item.rate);
    item.max = count;
  });
  let randomRes = turntable.filter((item: any) => {
    return randNum > item.min && randNum <= item.max;
  })[0];

  // 若中奖没有中奖图片，则为未中奖
  if (randomRes.type === turntableSuccess.value && !randomRes.result_img) {
    randomRes = turntable.filter(
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

    // 5. 显示中奖结果
    if (Number(randomRes.type) === turntableSuccess.value) {
      dialogConfig.title = "中奖啦";
      dialogConfig.resultText = "请扫码领取";
      dialogConfig.destoryTime = 15;
    } else {
      dialogConfig.title = "没抽中";
      dialogConfig.resultText = "真不巧，没抽中！";
      dialogConfig.destoryTime = 3;
    }
    dialogConfig.show = true;
    dialogConfig.resultImg = randomRes.result_img;
    // dialogRef.countDown() // 倒计时

    setTimeout(() => {
      isRunning.value = false;
      turntableRef.value.removeEventListener(transitionend, runEnd);
    }, 3 * 1000);
  };

  turntableRef.value.addEventListener(transitionend, runEnd);
};

const isRunning = ref(false);
// 获取实例
const turntableRef = ref();
// // dialog实例
// const dialogRef = ref();

const turntableSuccess = ref(1);
const turntableFail = ref(2);

// const dialogVisible = ref(false)

const turntable = reactive([
  {
    location: 1, // 位置 1-6
    type: 1, // 抽奖类型 1：活动 2：未中奖
    icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 90, // 中奖概率 1-100
  },

  // 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  // 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
  {
    location: 2, // 位置 1-6
    type: 1, // 抽奖类型 1：活动 2：未中奖
    icon: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 20, // 中奖概率 1-100
  },
  {
    location: 3, // 位置 1-6
    type: 1, // 抽奖类型 1：活动 2：未中奖
    icon: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 20, // 中奖概率 1-100
  },
  {
    location: 4, // 位置 1-6
    type: 2, // 抽奖类型 1：活动 2：未中奖
    icon: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 20, // 中奖概率 1-100
  },
  {
    location: 5, // 位置 1-6
    type: 1, // 抽奖类型 1：活动 2：未中奖
    icon: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 10, // 中奖概率 1-100
  },
  {
    location: 6, // 位置 1-6
    type: 1, // 抽奖类型 1：活动 2：未中奖
    icon: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg", // 转盘上的图片
    result_img: "", // 中奖结果图片
    rate: 10, // 中奖概率 1-100
  },
]);

const dialogConfig = reactive({
  show: false,
  title: "",
  resultImg: "",
  resultText: "",
  destoryTime: 15,
});
</script>

<style lang="scss" scoped>
.turntable-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #f80;

  .turntable-bg {
    position: relative;
    z-index: 2;
    width: 840px;
    height: 1111px;
    margin: auto;
    background: url("@/assets/luckyDraw/turntable-bg.png") no-repeat 100% 100%;
    background-position: center;
    background-size: contain;

    .light {
      position: absolute;
      top: 4px;
      left: 0;
      width: 822px;
      height: 830px;
      margin: auto;
      animation: rotate 15s linear infinite;
      background: url("@/assets/luckyDraw/light.png") no-repeat 100% 100%;
      background-size: contain;
    }

    .pointer {
      position: absolute;
      z-index: 1;
      top: 255px;
      left: 310px;
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
        right: 0;
        left: 0;
        width: 500px;
        height: 500px;
        margin: 0 auto;
        transform: rotate(-15deg);

        li {
          position: absolute;
          top: 0;
          left: 0;
          width: 250px;
          height: 250px;
          transform-origin: right bottom;
          border-radius: 50%;
          color: #000;
          line-height: 250px;
          text-align: center;

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
            transform: rotate(-45deg);
            border: 0;
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
