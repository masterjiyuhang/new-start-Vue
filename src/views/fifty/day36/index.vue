<template>
  <div class="wrapper-page">
    <div class="carousel">
      <div class="img-container" ref="imgContainerRef">
        <img
          v-for="(item, index) in imgList"
          :key="item"
          :src="item"
          class="img-item"
          :alt="index + `_image`"
        />
      </div>
      <div class="buttons-container">
        <button class="btn" @click="handleClick('prev')">Prev</button>
        <button class="btn" @click="handleClick('next')">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const imgList = ref([
  "https://images.unsplash.com/photo-1599394022918-6c2776530abb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1458&q=80",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1492&q=80",
]);
const activeIndex = ref(0);
const imgContainerRef = ref();

let timer = setInterval(run, 2000);

function resetInterval() {
  clearInterval(timer);
  timer = setInterval(run, 2000);
}

function run() {
  activeIndex.value++;
  changeImage();
}

function handleClick(type) {
  if (type === "prev") {
    activeIndex.value--;
  } else if (type === "next") {
    activeIndex.value++;
  }

  changeImage();
  resetInterval();
}

function changeImage() {
  if (activeIndex.value > imgList.value.length - 1) {
    activeIndex.value = 0;
  } else if (activeIndex.value < 0) {
    activeIndex.value = imgList.value.length - 1;
  }

  imgContainerRef.value.style.transform = `translateX(${-activeIndex.value * 500}px)`;
}
</script>

<style lang="scss" scoped>
.carousel {
  width: 500px;
  height: 530px;
  overflow: hidden;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 30%);

  .img-container {
    display: flex;
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;

    .btn {
      width: 49.5%;
      padding: 0.5rem;
      border: none;
      background-color: rebeccapurple;
      color: #fff;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }

      &:focus {
        outline: none;
      }
    }
  }
}

.img-item {
  width: 500px;
  height: 500px;
  object-fit: cover;
}
</style>
