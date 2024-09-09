<template>
  <div class="relative wrapper-page">
    <div class="sub-header">
      <div class="sub-header-default">
        <div class="bg-red-300 s-main">
          <div
            v-for="(item, index) in list"
            :key="item.name"
            :class="currentIndex === index ? 'sh-current-item' : ''"
            class="base-content"
            @mouseenter.stop="onMouseenter(item, index)"
            @mouseleave.stop="onMouseleave(item, index)"
          >
            <div class="tab-title">{{ item.name }}</div>
            <div
              class="animated-tab-content"
              ref="box"
              :style="{
                height: `${customerFnNumber}px`,
              }"
            >
              <div class="tab-content">
                <div
                  class="animated-tab-content-children"
                  :style="{
                    opacity: `${customerOpacity}`,
                  }"
                >
                  <div class="header-fy24">
                    <div class="panel-wrapper main-cate">{{ item.name }}</div>
                    <div class="panel-wrapper secondary-cate">2</div>
                    <div class="final-cate has-more">3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <testUseAnimate />
  </div>
</template>

<script setup>
import { useAnimate, useTransition } from "@vueuse/core";

import testUseAnimate from "./components/testUseAnimate.vue";

const list = ref([
  { name: "All categories" },
  { name: "Featured selections" },
  { name: "Trade Assurance" },
]);

const contentHeight = ref(340);
const contentChildrenOpacity = ref(0);
const currentIndex = ref(-1);
const box = ref(null);
function easeOutElastic(n) {
  return n === 0
    ? 0
    : n === 1
      ? 1
      : 2 ** (-10 * n) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
}

const customerFnNumber = useTransition(contentHeight, {
  duration: 200,
  // transition: easeOutElastic,
});

const customerOpacity = useTransition(contentChildrenOpacity, {
  duration: 300,
  // transition: easeOutElastic,
});
function onMouseenter(item, index) {
  // console.log(
  // "🚀 ~ file: index.vue:47 ~ onMouseenter ~ box:",
  // box.value[index],
  // box.value,
  // );

  if (index === 0) {
    contentHeight.value = 622;
  } else if (index === 1) {
    contentHeight.value = 322;
  } else {
    contentHeight.value = 340;
  }
  currentIndex.value = index;
  contentChildrenOpacity.value = 1;
}
function onMouseleave(item, index) {
  contentChildrenOpacity.value = contentChildrenOpacity.value === 1 ? 0 : 1;
  console.log(
    "🚀 ~ file: index.vue:98 ~ onMouseleave ~ contentChildrenOpacity.value:",
    contentChildrenOpacity.value,
  );
  // console.log("🚀 ~ file: index.vue:96 ~ onMouseleave ~ item:", item);
  currentIndex.value = -1;
  contentHeight.value = 300;
}
</script>

<style lang="scss" scoped>
.sub-header {
  min-width: 600px;
  max-width: 1580px;
  height: 36px;
  margin: 0 auto;
  overflow: hidden;
  font-size: 14px;

  .sub-header-default {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    padding: 0 40px;

    .s-main {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .base-content {
        display: flex;
        align-items: center;
        margin-top: -2px;
        padding-right: 28px;
        cursor: pointer;

        .tab-title {
          position: relative;
          height: 36px;
        }

        .animated-tab-content {
          visibility: hidden;
          position: absolute;
          top: 108px;
          left: 0;
          width: 100%;
          overflow: hidden;
          border-top: 1px solid #ddd;
          opacity: 0;
          background-color: #fff;

          .tab-content {
            background-color: antiquewhite;
            color: red;
          }
        }
      }

      .sh-current-item {
        .animated-tab-content {
          visibility: visible;
          top: 161px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
