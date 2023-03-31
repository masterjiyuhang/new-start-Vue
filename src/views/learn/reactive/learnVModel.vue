<template>
  <div class="wrapper-page">
    <!-- <el-button @click="modelValue = !modelValue">{{
      modelValue ? "关闭" : "展开"
    }}</el-button> -->
    <modelChild
      :model-value="modelValue"
      @update:model-value="update"
      @getMsg="getMsg"
    />

    <modelChildMore/>
  </div>
</template>

<script setup lang="ts">
/**
 * v-model 一个语法糖 props+emit实现
 *
 */
import { ref } from "vue";
import modelChild from "./src/components/modelChild.vue";
import modelChildMore from "./src/components/modelChildMore.vue";

const modelValue = ref(false);

const update = (e: boolean) => {
  console.log(e, "传递过来的e");
  modelValue.value = e;
};

const getMsg = (msg: string) => {
  console.log("接受消息", msg);
};
</script>

<style lang="scss" scoped></style>
