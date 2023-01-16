<template>
  <el-container>
    <el-aside class="aside bg-white-300" width="auto">
      <Sider />
    </el-aside>
    <el-container class="min-w-full min-h-screen">
      <el-header class="bg-red-500">
        <el-button @click="changeCollapse"> chang collapse1 </el-button>

        Header
      </el-header>
      <el-main class="bg-green-300">
        <RouterView>
          <template #default="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </template>
        </RouterView>
      </el-main>
      <el-footer class="bg-yellow-300">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/stores/modules/setting";
// import { computed, unref } from "vue";
import Sider from "./sider/index.vue";

const settingStore = useSettingStore();
// const { getCollapse } = storeToRefs(settingStore);
// const getCollapsed = computed(() => settingStore.getCollapse);
// const getSiderWidth = computed(() => {
//   return unref(getCollapsed) ? "80px" : "200px";
// });

const changeCollapse = () => settingStore.changeCollapse();
</script>

<style scoped>
.aside {
  /* width: 200px; */
  min-height: 400px;
}
</style>
