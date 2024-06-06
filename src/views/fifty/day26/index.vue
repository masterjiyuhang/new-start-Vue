<template>
  <div class="wrapper-page slider-container" ref="slideContainerRef">
    <div
      class="left-slide"
      :style="{
        top: -leftSlideTop + 'px',
        transform: `translateY(${transformLeft}px)`,
      }"
    >
      <div
        v-for="item in leftSlides"
        :key="item.id"
        :style="{
          backgroundColor: item.bg,
        }"
        class="h-full left-slide-item"
      >
        <h1 enter-class="text-3xl">{{ item.title }}</h1>
        <p>{{ item.label }}{{ transformLeft }}</p>
      </div>
    </div>
    <div
      class="right-slide"
      :style="{
        transform: `translateY(${transformRight}px)`,
      }"
    >
      <div
        v-for="item in rightSlides"
        :key="item.id"
        :style="{
          backgroundImage: `url(${item})`,
        }"
        class="w-full h-full bg-center bg-no-repeat bg-cover"
      ></div>
    </div>
    <div class="action-buttons">
      <button class="down-btn" @click="changeSlide('bottom')">
        <svg
          t="1717470251381"
          class="icon size-16"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="12892"
          width="200"
          height="200"
        >
          <path
            d="M955.733333 460.8c-37.546667-40.96-105.813333-40.96-143.36-3.413333l-177.493333 170.666666V119.466667C631.466667 54.613333 576.853333 0 512 0s-119.466667 54.613333-119.466667 119.466667v505.173333l-177.493333-170.666667c-40.96-37.546667-105.813333-37.546667-143.36 3.413334-37.546667 40.96-37.546667 105.813333 3.413333 143.36l430.08 416.426666c-3.413333 6.826667 3.413333 6.826667 6.826667 6.826667s10.24 0 10.24-3.413333l430.08-416.426667c40.96-37.546667 40.96-102.4 3.413333-143.36z"
            fill="#f4ea2a"
            p-id="12893"
          />
        </svg>
      </button>
      <button class="up-btn" @click="changeSlide('top')">
        <svg
          t="1717470203868"
          class="icon size-16"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10113"
          width="200"
          height="200"
        >
          <path
            d="M918.976 681.728L541.866667 304.597333a32 32 0 0 0-45.226667 0L119.466667 681.728a32 32 0 1 0 45.226666 45.248L519.253333 372.501333l354.474667 354.474667a32 32 0 0 0 45.248-45.248z"
            fill="#1afa29"
            p-id="10114"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const activeIndex = ref(0);
const slideContainerRef = ref();
const transformLeft = ref(0);
const transformRight = ref(0);

const leftSlideTop = ref(0);
onMounted(() => {
  leftSlideTop.value =
    slideContainerRef.value.clientHeight * (rightSlides.length - 1);
});

const leftSlides = [
  {
    id: 1,
    title: "Nature flower",
    label: "all in pink",
    bg: "#fd3555",
  },
  {
    id: 2,
    title: "Blue Sky",
    label: "with it's mountains",
    bg: "#2a86ba",
  },
  { id: 3, title: "Lonely castle", label: "in the wilderness", bg: "#252e33" },
  { id: 4, title: "Flying eagle", label: "in the sunset", bg: "#ffb866" },
];

const rightSlides = [
  "https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80",
  "https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80",
  "https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80",
];
function changeSlide(direction: string) {
  console.log(slideContainerRef);
  const sliderHeight = slideContainerRef.value.clientHeight;
  if (direction === "top") {
    activeIndex.value--;

    if (activeIndex.value < 0) {
      activeIndex.value = leftSlides.length - 1;
    }
  } else if (direction === "bottom") {
    activeIndex.value++;

    if (activeIndex.value > leftSlides.length - 1) {
      activeIndex.value = 0;
    }
  }

  transformRight.value = -activeIndex.value * sliderHeight;
  transformLeft.value = activeIndex.value * sliderHeight;
}
</script>

<style lang="scss" scoped>
.slider-container {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .left-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    transition: transform 0.5s ease-in-out;

    .left-slide-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }

  .right-slide {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .action-buttons {
    position: absolute;
    top: 50%;
    left: calc(50% - 64px);

    button {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
