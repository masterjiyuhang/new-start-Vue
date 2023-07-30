<template>
  <div class="wrapper-page">
    <!-- <SeamlessScroll /> -->
    <el-space wrap>
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>无缝滚动示例</span>
            <el-button
              class="button"
              link
              type="primary"
              @click="changeDirection('top')"
            >
              <span
                :style="{ color: classOption.direction === 'top' ? 'red' : '' }"
              >
                向上滚动
              </span>
            </el-button>
            <el-button
              class="button"
              link
              type="primary"
              @click="changeDirection('bottom')"
            >
              <span
                :style="{
                  color: classOption.direction === 'bottom' ? 'red' : '',
                }"
              >
                向下滚动
              </span>
            </el-button>
            <el-button
              class="button"
              link
              type="primary"
              @click="changeDirection('left')"
            >
              <span
                :style="{
                  color: classOption.direction === 'left' ? 'red' : '',
                }"
              >
                向左滚动
              </span>
            </el-button>
            <el-button
              class="button"
              link
              type="primary"
              @click="changeDirection('right')"
            >
              <span
                :style="{
                  color: classOption.direction === 'right' ? 'red' : '',
                }"
              >
                向右滚动
              </span>
            </el-button>
          </div>
        </template>

        <TestScroll
          ref="scroll"
          :data="listData"
          :class-option="classOption"
          class="warp"
          v-if="true"
        >
          <ul class="item">
            <li v-for="(item, index) in listData" :key="index">
              <span class="title" v-text="item.title" />
            </li>
          </ul>
        </TestScroll>
      </el-card>

      <el-card v-if="true">
        <CchScroll
          ref="scroll2"
          :data="listData"
          :class-option="classOption"
          class="warp"
        >
          <ul class="item">
            <li v-for="(item, index) in listData" :key="index">
              <span class="title" v-text="item.title" />
            </li>
          </ul>
        </CchScroll>
      </el-card>

      <el-card class="w-[600px]">
        <ContinuousScroll
          :data="listData"
          :class-option="{
            step: 1, // 数值越大速度滚动越快
            limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
            hoverStop: true, // 是否开启鼠标悬停stop
            direction: 3, // 0向下 1向上 2向左 3向右
            // openWatch: true, // 开启数据实时监控刷新dom
            singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
          }"
        >
          <ul class="flex">
            <li v-for="(item, index) in listData" :key="index">
              <img
                class="w-10 h-10"
                src="@/assets/shopping/OnlineShopping1.png"
                alt=""
              />
              <span v-show="false">{{ item }}</span>
            </li>
          </ul>
        </ContinuousScroll>
      </el-card>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "vue";
import TestScroll from "./src/TestScroll.vue";
import CchScroll from "./src/CchScroll.vue";
import ContinuousScroll from "./src/ContinuousScroll.vue";

const classOption = reactive({
  direction: "right",
});

const scroll = ref();
const scroll2 = ref();

const changeDirection = (val) => {
  (unref(scroll) as any).reset();
  (unref(scroll2) as any).reset();
  unref(classOption).direction = val;
};

const listData = ref([
  {
    title: "无缝滚动第一行无缝滚动第一行！！！！！！！！！！",
  },
  {
    title: "无缝滚动第二行无缝滚动第二行！！！！！！！！！！",
  },
  {
    title: "无缝滚动第三行无缝滚动第三行！！！！！！！！！！",
  },
  {
    title: "无缝滚动第四行无缝滚动第四行！！！！！！！！！！",
  },
  {
    title: "无缝滚动第五行无缝滚动第五行！！！！！！！！！！",
  },
  {
    title: "无缝滚动第六行无缝滚动第六行！！！！！！！！！！",
  },
  {
    title: "无缝滚动第七行无缝滚动第七行！！！！！！！！！！",
  },
  {
    title: "无缝滚动第八行无缝滚动第八行！！！！！！！！！！",
  },
  {
    title: "无缝滚动第九行无缝滚动第九行！！！！！！！！！！",
  },
]);
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    margin-right: 20px;
  }
}

.warp {
  width: 360px;
  height: 270px;
  margin: 0 auto;
  overflow: hidden;

  ul {
    padding: 0;
    margin: 0 auto;
    list-style: none;

    li,
    a {
      display: flex;
      justify-content: space-between;
      height: 30px;
      font-size: 15px;
      line-height: 30px;
    }
  }
}
</style>
