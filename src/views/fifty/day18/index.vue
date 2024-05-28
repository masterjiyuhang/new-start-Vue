<template>
  <div class="wrapper-page">
    <div
      class="w-full h-full slide-page"
      :style="{
        backgroundImage: `url(${imageList[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div class="relative slide-container">
        <div
          class="text-red-400 slide-item"
          :class="currentIndex === index ? 'active' : ''"
          v-for="(item, index) in imageList"
          :key="index"
          :style="{
            backgroundImage: `url(${item})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }"
        >
          {{ currentIndex }}
        </div>
        <button class="arrow left-arrow" @click="handleLeft">
          <svg
            t="1716884546290"
            class="w-20 h-20 icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4194"
            width="200"
            height="200"
          >
            <path
              d="M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z"
              fill="#262626"
              p-id="4195"
            />
          </svg>
        </button>

        <button class="arrow right-arrow" @click="handleRight">
          <svg
            t="1716884567857"
            class="w-20 h-20 icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4341"
            width="200"
            height="200"
          >
            <path
              d="M610.88 512L192 93.12 285.12 0l512 512-512 512L192 930.88z"
              fill="#262626"
              p-id="4342"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const imageList = [
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
  "https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80",
  "https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
];

const currentIndex = ref(0);

function handleLeft() {
  currentIndex.value--;
  if (currentIndex.value < 0) {
    currentIndex.value = imageList.length - 1;
  }
}
function handleRight() {
  currentIndex.value++;
  if (currentIndex.value > imageList.length - 1) {
    currentIndex.value = 0;
  }
}
</script>

<style lang="scss" scoped>
.slide-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  overflow: hidden;
  transition: 0.4s;
  background-position: center center;
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(0 0 0 / 70%);
  }
}

.slide-container {
  position: relative;
  width: 70vw;
  height: 70vh;
  overflow: hidden;
  box-shadow:
    0 3px 6px rgb(13 201 166 / 16%),
    0 3px 6px rgb(195 17 17 / 23%);

  .slide-item {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.4s ease;
    opacity: 0;
    background-position: center center;
    background-size: cover;
  }

  .active {
    opacity: 1;
  }
}

.arrow {
  position: absolute;
  z-index: 2;
  top: 50%;
  width: 80px;
  height: 80px;
  transform: translateY(-50%);
  border: 2px solid orange;
  border-radius: 50%;
  background-color: transparent;
  color: #fff;
  font-size: 30px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
}

.left-arrow {
  left: 0;
}

.right-arrow {
  right: 0;
}
</style>
