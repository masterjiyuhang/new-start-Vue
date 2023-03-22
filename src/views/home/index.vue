<template>
  <div class="base-card home-page">
    <img :src="welcome" class="home-img"/>
    <!-- home page

    {{ name }}

    <el-input v-model="name"> </el-input>
    {{ count }}
    <el-button @click="increment">count++</el-button> -->
  </div>
</template>

<script setup lang="ts">
import welcome from "@/assets/system/HalloweenIllustrations2.png";
// import { useCounterStore } from "@/stores/modules/count";
// import { useTestStore } from "@/stores/modules/test";

// import { storeToRefs } from "pinia";
// import { toRefs } from "vue";

// const { increment } = useCounterStore();

// const store = useTestStore();

// const { name } = toRefs(store);
// const { count } = storeToRefs(useCounterStore());
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .home-img {
		width: 70%;
		max-width: 800px;
		margin-bottom: 20px;
	}
}
</style>
