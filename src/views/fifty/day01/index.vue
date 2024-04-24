<template>
  <div class="wrapper-page">
    <div class="flex w-[90vw]">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="panel"
        :class="activeIndex === index ? 'active' : ''"
        :style="{
          backgroundImage: `url(${item.backgroundUrl})`,
        }"
        @click="handleClick(index)"
      >
        <h3 class="title">{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const list = [
  {
    title: "Explore The World",
    backgroundUrl:
      "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Wild Forest",
    backgroundUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
  },
  {
    title: "Sunny Beach",
    backgroundUrl:
      "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
  },
  {
    title: "City on Winter",
    backgroundUrl:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Mountains - Clouds",
    backgroundUrl:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
];

const activeIndex = ref(0);

const handleClick = (index: number) => {
  activeIndex.value = index;
};
</script>

<style scoped lang="scss">
.panel {
  position: relative;
  flex: 0.5;
  height: 80vh;
  margin: 10px;
  transition: all 700ms ease-in;
  border-radius: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #fff;
  cursor: pointer;

  .title {
    position: absolute;
    bottom: 20px;
    left: 20px;
    margin: 0;
    opacity: 0;
    font-size: 24px;
  }
}

.active {
  flex: 5;

  .title {
    transition: opacity 0.3s ease-in 0.4s;
    opacity: 1;
  }
}
</style>
