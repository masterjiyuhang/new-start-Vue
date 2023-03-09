<template>
  <div>
    <header class="w-32 h-32 bg-orange-300">
      <!-- 具名插槽 -->
      <slot name="header"> </slot>
    </header>
    <main class="w-32 h-32 bg-lime-600">
      <!-- 匿名插槽 -->
      <slot :userData="userData">
        <div>对不起我是默认插槽</div>
      </slot>
    </main>
    <footer class="w-32 h-32 bg-cyan-500">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

type user = {
  name: string;
  age: number;
};

const userData = reactive<user>({
  name: "cch",
  age: 18,
});
</script>

<style scoped></style>
