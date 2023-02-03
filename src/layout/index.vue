<template>
  <div>
    <div v-if="defaultSet.fixedHeader"></div>
    <app-main></app-main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import appMain from "./components/appMain.vue";
import { useAppStoreHook } from "@/stores/modules/app";

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
</script>

<style scoped></style>
