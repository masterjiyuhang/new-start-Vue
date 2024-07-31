<template>
  <div class="container text-center wrapper-page">
    <button id="btn" class="mb-3 magic" @click="handleClick">
      给你看个大宝贝 🐷
    </button>
    <div ref="boxRef" class="m-auto boxes big">
      <div
        v-for="(item, index) in itemList"
        :key="index"
        :class="item.class"
        :style="{
          backgroundPosition: item.backgroundPosition,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const boxRef = ref("");
const itemList = ref([]);
function handleClick() {
  boxRef.value.classList.toggle("big");
}

function createBoxes() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      itemList.value.push({
        class: "box-item",
        backgroundPosition: `${-j * 125}px ${-i * 125}px`,
      });
    }
  }
}

createBoxes();
</script>

<style lang="scss" scoped>
.magic {
  z-index: 100;
  padding: 12px 20px;
  border: 0;
  border-radius: 3px;
  background-color: #f9ca24;
  box-shadow: 0 3px rgb(249 202 36 / 50%);
  color: #fff;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;
}

.magic:focus {
  outline: none;
}

.magic:active {
  transform: translateY(2px);
  box-shadow: none;
}

.boxes {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 500px;
  height: 500px;
  transition: 0.4s ease;
}

.boxes.big {
  width: 600px;
  height: 600px;
}

.boxes.big .box {
  transform: rotateZ(360deg);
}

.box-item {
  position: relative;
  width: 125px;
  height: 125px;
  transition: 0.4s ease;
  background-image: url("https://erhang-cdn.imgix.net/trunk.jpg");
  background-repeat: no-repeat;
  background-size: 500px 500px;
}

.box-item::after {
  content: "";
  position: absolute;
  top: 8px;
  right: -15px;
  width: 15px;
  height: 100%;
  transform: skewY(45deg);
  background-color: #f6e58d;
}

.box-item::before {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 8px;
  width: 100%;
  height: 15px;
  transform: skewX(45deg);
  background-color: #f9ca24;
}
</style>
