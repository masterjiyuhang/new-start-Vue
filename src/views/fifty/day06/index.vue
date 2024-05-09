<template>
  <div
    class="relative mx-auto !h-[900px] !bg-[#e4e3d8] overflow-scroll text-center"
    id="wrapper"
    ref="wrapperRef"
  >
    <h1 class="fixed text-green-400">{{ y }}</h1>
    <div
      v-for="item in arr"
      :key="item.id"
      class="mx-auto my-3 box"
      :class="item.id < 5 ? 'show' : ''"
    >
      <h2 class="label">{{ item.name }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { watchEffect, onUnmounted, onMounted, ref } from "vue";

const arr = Array.from({ length: 11 }).map((_, index) => {
  return {
    id: index + 1,
    name: `Content${index + 1}`,
  };
});

const wrapperRef = ref<HTMLElement | null>(null);
let boxes: HTMLElement[] = [];
const { x, y } = useScroll(wrapperRef);
watchEffect(() => {
  console.log(x.value, y.value);
});
onMounted(() => {
  boxes = Array.from(wrapperRef.value?.querySelectorAll(".box") ?? []);
  checkBoxes();
  wrapperRef.value?.addEventListener("scroll", (_e) => {
    console.log("wrapper scroll");
    checkBoxes();
  });
});

onUnmounted(() => {
  wrapperRef.value?.removeEventListener("scroll", checkBoxes);
});

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 5) * 4;
  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 300px;
  transform: translateX(60%);
  transition: transform 1s ease;
  border-radius: 10px;
  background-color: #f80;
  box-shadow: 2px 4px 5px rgb(0 0 0 / 30%);
  color: #fff;

  .label {
    font-size: 45px;
  }

  &:nth-of-type(even) {
    transform: translateX(-60%);
  }
}

.show {
  transform: translateX(0) !important;
}
</style>
