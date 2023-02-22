<template>
  <div>
    header
    <!-- <div class="rc-header__tool" @click="onToggleCollapse">
      <i :class="[isMenuAsideCollapse ? 'rc-icon-packup' : 'rc-icon-un']" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const { isCollapse } = storeToRefs(useGlobalSettingStore());

watch(
  () => isCollapse.value,
  (newVal) => {
    console.log(newVal, "header");
  }
);
</script>

<style scoped></style>
