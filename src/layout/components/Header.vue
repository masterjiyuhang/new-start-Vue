<template>
  <div class="flex-bc">
    <el-icon @click="handleChangeCollapse">
      <Expand v-if="isCollapse" />
      <Fold v-else />
    </el-icon>
    <!-- <el-icon><Fold /></el-icon> -->

    <!-- <div class="rc-header__tool" @click="onToggleCollapse">
      <i :class="[isMenuAsideCollapse ? 'rc-icon-packup' : 'rc-icon-un']" />
    </div> -->
    <div>header{{ isCollapse }}用户</div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";

const { changeIsCollapse } = useGlobalSettingStore();
const { isCollapse } = storeToRefs(useGlobalSettingStore());

watch(
  () => isCollapse.value,
  (newVal) => {
    console.log(newVal, "header 中监听collapse变化");
  }
);

const handleChangeCollapse = changeIsCollapse;
</script>

<style scoped></style>
