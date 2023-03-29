<template>
  <div class="wrapper-page">
    <!-- watchEffect会执行两次 -->
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { nextTick, onMounted, ref, watch, watchEffect } from "vue";

const greet = (name: string): void => {
  ElMessage.success(`哈哈 你输入了，${name.toLocaleLowerCase()}!!`);
};

const myName = ref<string>("erhang");

// 解决方法2： 放在onMounted钩子函数中，这样它只会在组件挂载后执行一次
onMounted(() => {
  watchEffect(() => {
    greet(myName.value);
  });
});

// 解决方法3： isMounted  它是Vue3内置的函数，Vue 3 的组合 API 中没有内置的 isMounted 函数,可以用来判断组件是否已经挂载。
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

watchEffect(() => {
  if (isMounted.value) {
    greet(myName.value);
  }
});

// 解决方法4：使用watch函数来替代watchEffect，并将immediate选项设置为true，这样在初始化时就会立即执行回调函数，并且不会再次执行
watch(
  () => myName.value,
  (newValue) => {
    greet(newValue);
  },
  { immediate: true } // 设置 immediate 选项为 true
);

// 解决方法1： 通过使用 nextTick 方法可以确保在组件完成初始渲染后再执行 greet 函数，避免在组件挂载时的多余调用。
// 使用 nextTick 函数推迟执行回调函数可能会影响组件的性能，因为它会延迟更新视图。如果你的组件需要尽快更新视图，不要使用 nextTick 函数。
watchEffect(async () => {
  console.log(myName.value, "watchEffect 是否有变化");
  await nextTick();
  greet(myName.value);
});

/**
 * 由于watchEffect会在组件初始化时立即执行一次，直接写watchEffect页面会打印两次message。
 * 初始化一次，随后在set value的过程中它会再次运行 watchEffect 进行第二次。
 * 为了避免这个效果，看下面的解决方法
 */
watchEffect(() => {
  greet(myName.value);
});
</script>

<style scoped></style>
