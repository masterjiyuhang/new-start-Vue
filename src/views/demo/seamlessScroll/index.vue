<template>
  <div class="wrapper-page">
    <!-- <SeamlessScroll /> -->
    <el-space wrap>
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>无缝滚动示例{{ classOption.direction }}</span>
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
          </div>
        </template>

        <SeamlessScroll ref="scroll">
          <ul>
            <li v-for="(item, index) in listData" :key="index">
              <span class="title" v-text="item.title"></span>
            </li>
          </ul>
        </SeamlessScroll>
      </el-card>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "vue";

const classOption = reactive({
  direction: "top",
});

const scroll = ref();
const changeDirection = (val) => {
  (unref(scroll) as any).reset();
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

<style scoped></style>
