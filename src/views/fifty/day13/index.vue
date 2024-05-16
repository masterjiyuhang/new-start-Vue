<template>
  <div class="wrapper-page">
    <div class="flex flex-col items-center justify-center w-full h-full p-8">
      <div class="mb-4">
        <el-button type="primary" @click="handleRandomSelect">
          随机选择
        </el-button>
        <el-button type="success" @click="handleReset"> 重置输入 </el-button>
      </div>
      <div class="my-4">
        <span>输入的tag:</span>
        <el-tag
          class="m-4"
          effect="dark"
          v-for="(item, index) in enterItems"
          :type="item.type"
          :key="item.value + index"
          ref="tagListRef"
        >
          {{ item.value }}
        </el-tag>
      </div>
      <el-input
        v-model="text"
        style="width: 240px"
        class="text-neutral-900"
        placeholder="Please input"
        @keyup.enter="handleEnter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";

const text = ref("");
const tagListRef = ref();

type EnterItem = {
  type: string;
  value: string;
};
const enterItems = ref<EnterItem[]>([]);

const tagTypeList = ref<string[]>(["primary", "info", "warning", "danger"]);

// 定义一个方法来获取随机颜色
function getRandomTagType() {
  const randomIndex = Math.floor(Math.random() * tagTypeList.value.length);
  return tagTypeList.value[randomIndex];
}
function handleEnter() {
  if (text.value.trim()) {
    // 确保输入非空白
    enterItems.value.push({
      type: getRandomTagType(),
      value: text.value.trim(),
    }); // 将输入的内容添加到数组
    text.value = ""; // 清空输入框
  }
}

function handleReset() {
  enterItems.value = [];
}

let timeoutId;
// 初始化计数器
let timeoutCount = 0;

function handleRandomSelect() {
  // 清除计数器和定时器
  timeoutCount = 0;
  timeoutId = null;
  randomSelect();
}

function randomSelect(changeCount = 20) {
  if (enterItems.value.length > 0) {
    enterItems.value.forEach((item) => {
      item.type = getRandomTagType();
    });
    // 如果已经设置了定时器，就清除它
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // 重新设置定时器，但只允许执行最多3次
    if (timeoutId === undefined || timeoutCount < changeCount) {
      timeoutCount++;
      timeoutId = setTimeout(() => {
        randomSelect();
      }, 50);
    } else {
      enterItems.value.forEach((item) => {
        item.type = "info";
      });

      const successIndex = Math.floor(Math.random() * enterItems.value.length);
      enterItems.value[successIndex].type = "success";
    }
  } else {
    ElMessage.warning("请先输入内容");
  }
}
</script>

<style scoped></style>
