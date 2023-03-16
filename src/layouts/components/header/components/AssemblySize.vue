<template>
  <el-dropdown trigger="click" @command="setAssemblySize">
    <IconAddMore class="toolBar-icon" />

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in assemblySizeList"
          :key="item"
          :disabled="currentAssemblySize === item"
          :command="item"
        >
          {{ assemblySizeListCh[item] }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import IconAddMore from "@/components/icons/IconAddMore.vue";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { reactive } from "vue";
import { AssemblySizeType } from "@/stores/interface";
import { storeToRefs } from "pinia";

const { setAssemblySizeSize } = useGlobalSettingStore();
const { assemblySize: currentAssemblySize } = storeToRefs(
  useGlobalSettingStore()
);

const assemblySizeList: AssemblySizeType[] = ["default", "large", "small"];
const assemblySizeListCh = reactive<{ [key: string]: string }>({
  default: "默认",
  large: "大型",
  small: "小型",
});

const setAssemblySize = (item: AssemblySizeType) => {
  console.log(item, "设置");
  if (currentAssemblySize.value === item) return;
  setAssemblySizeSize(item);
};
</script>

<style scoped></style>
