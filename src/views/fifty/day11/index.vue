<template>
  <div class="grid flex-col text-center wrapper-page place-items-center">
    <div>
      <div v-for="(item, index) in keyHistory" :key="index" class="key">
        {{ item.key }}-{{ item.code }}
      </div>
      <div v-if="!keyHistory.length" class="key">Press any key to get the keyCode</div>
    </div>
    <div class="flex">
      <div class="item">key:{{ key }}</div>
      <div class="item">code:{{ code }}</div>
      <div class="item">keyCode:{{ keyCode }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";

const key = ref("");
const code = ref("");
const keyCode = ref<number | null>(null);
const keyHistory = ref<{ key: string; code: string }[]>([]);

useEventListener(document, "keydown", (e) => {
  keyHistory.value.unshift({ key: e.key, code: e.code });
  if (keyHistory.value.length > 16) keyHistory.value.pop();

  key.value = e.key;
  code.value = e.code;
  keyCode.value = e.keyCode;
});
</script>

<style lang="scss" scoped>
.item {
  width: 120px;
  height: 60px;
  margin: auto;
  border: 1px solid snow;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 10%);
  color: sandybrown;
  font-weight: 700;
  line-height: 60px;
}
</style>
