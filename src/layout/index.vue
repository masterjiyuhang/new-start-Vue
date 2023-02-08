<template>
  <div :class="['app-wrapper']">
    <Sidebar />
    <div :class="['main-container']">
      <div v-if="defaultSet.fixedHeader">
        <layout-header />
        <app-main></app-main>
      </div>
      <el-scrollbar v-else>
        <app-main></app-main>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, reactive } from "vue";
import appMain from "./components/appMain.vue";
import { useAppStoreHook } from "@/stores/modules/app";

import Sidebar from "./components/aside/index.vue";
import Tab from "./components/tag/index.vue";
import Navbar from "./components/navbar/index.vue";

const defaultSet = reactive({
  sidebar: computed(() => {
    return useAppStoreHook().sidebar;
  }),

  fixedHeader: computed(() => {
    return true;
  }),

  classes: computed(() => {
    return {
      hideSidebar: !defaultSet.sidebar.opened,
      openSidebar: defaultSet.sidebar.opened,
      withoutAnimation: defaultSet.sidebar.withoutAnimation,
    };
  }),
});

const layoutHeader = defineComponent({
  render() {
    return h(
      "div",
      {
        class: { "fixed-header": defaultSet.fixedHeader },
        style: ["box-shadow: 0 1px 4px #0d0d0d"],
      },
      { default: () => [h(Navbar), h(Tab)] }
    );
  },
});

function setTheme(layoutModel: string = "vertical") {
  window.document.body.setAttribute("layout", layoutModel);
}

setTheme();
</script>

<style scoped></style>
