<template>
  <div class="welcome">
    welcome {{ count }}
    <el-button @click="increment">count++</el-button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/modules/count";
import { storeToRefs } from "pinia";
import { useScript } from "@/hooks/useScript";
import { onMounted } from "vue";

const BAI_DU_MAP_URL =
  "https://api.map.baidu.com/getscript?v=3.0&ak=OaBvYmKX3pjF7YFUFeeBCeGdy9Zp7xB2&services=&t=20210201100830&s=1";

const { toPromise } = useScript({ src: BAI_DU_MAP_URL ?? "basic-api/system/getAccountList" });
const init = async () => {
  try {
    const res = await toPromise();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  init();
});
const { increment } = useCounterStore();
const { count } = storeToRefs(useCounterStore());
</script>

<style scoped>
.welcome {
  height: 100%;
}
</style>
