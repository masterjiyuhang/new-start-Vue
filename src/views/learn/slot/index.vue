<template>
  <div>
    <testSlot>
      <!-- 具名插槽 -->
      <template v-slot:header> 上面的插槽 </template>
      <!-- 作用域插槽 带数据 父组件可以拿到子组件的值 -->
      <template #default="{ userData }">
        <div>{{ userData.name }} - {{ userData.age }}</div>
      </template>
      <!-- 具名插槽 -->
      <template #footer> 下面的插槽</template>

      <!-- 动态插槽 -->
      <template #[slotName]> <div>随机插入 动态插槽</div> </template>
    </testSlot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import testSlot from "./testSlot.vue";

const slotName = ref<string>("footer");
</script>

<style scoped></style>
