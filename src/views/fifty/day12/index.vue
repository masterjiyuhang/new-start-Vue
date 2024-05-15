<template>
  <div class="wrapper-page">
    <div>
      <el-button type="primary" :icon="ArrowDown" circle />
      <el-button type="primary" :icon="CloseBold" circle />
    </div>

    <div
      v-for="(item, index) in articleList"
      :key="index"
      class="faq"
      :class="activeIndex === index ? 'active' : ''"
    >
      <h3 class="faq-title">{{ item.title }}</h3>
      <p class="faq-text">{{ item.desc }}</p>
      <el-button
        type="primary"
        :icon="activeIndex === index ? CloseBold : ArrowDown"
        circle
        class="faq-toggle"
        @click="handleClick(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, CloseBold } from "@element-plus/icons-vue";
import { ref } from "vue";

const activeIndex = ref<number | string | null>();
function handleClick(index) {
  if (activeIndex.value === index) {
    activeIndex.value = "";
  } else {
    activeIndex.value = index;
  }
}
const articleList = [
  {
    title: " Why shouldn't we trust atoms?",
    desc: "They make up everything",
  },
  {
    title: "  What do you call someone with no body and no nose?",
    desc: " Nobody knows.",
  },
  {
    title: "What's the object-oriented way to become wealthy?",
    desc: "Inheritance.",
  },
  {
    title: " How many tickles does it take to tickle an octopus?",
    desc: "Ten-tickles!",
  },
  {
    title: "What is: 1 + 1?",
    desc: "Depends on who are you asking.",
  },
];
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");

.faq {
  position: relative;
  margin: 20px 0;
  padding: 30px;
  overflow: hidden;
  transition: 0.3s ease;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: #fcfcfc;
  color: #1d30dc;

  .faq-title {
    margin: 0 35px 0 0;
  }

  .faq-text {
    display: none;
    margin: 30px 0 0;
    color: salmon;
    font-weight: 500;
  }
}

.faq.active .faq-text {
  display: block;
}

.active {
  background-color: #d8e2e9;
  box-shadow:
    0 3px 6px rgb(0 0 0 / 10%),
    0 3px 6px rgb(0 0 0 / 10%);

  &::before,
  &::after {
    content: "\f075";
    position: absolute;
    z-index: 0;
    top: 20px;
    left: 20px;
    opacity: 0.2;
    color: #2e80cc;
    font-family: "Font Awesome 5 Free";
    font-size: 7rem;
  }

  .faq-toggle {
    background-color: #9fa4a8;
  }
}

.faq-toggle {
  display: flex;
  position: absolute;
  top: 30px;
  right: 30px;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background-color: #2e80cc;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
}
</style>
