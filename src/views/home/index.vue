<template>
  <div>
    home page

    {{ name }}

    <el-input v-model="name"> </el-input>
    {{ count }}
    <el-button @click="increment">count++</el-button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/modules/count";
import { useTestStore } from "@/stores/modules/test";

import { storeToRefs } from "pinia";
import { toRefs } from "vue";

const { increment } = useCounterStore();

const store = useTestStore();

const { name } = toRefs(store);
const { count } = storeToRefs(useCounterStore());
</script>

<style scoped></style>
