<template>
  <div class="grid flex-col text-center wrapper-page place-items-center">
    <div id="insert">
      <div class="key">Press any key to get the keyCode</div>
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
useEventListener(document, "keydown", (e) => {
  const insert = document.getElementById("insert");
  if (insert) {
    insert.innerHTML = `<div class="key">${e.key}-${e.code}</div>`;
  }

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
