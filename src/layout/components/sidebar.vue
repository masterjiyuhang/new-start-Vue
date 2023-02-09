<template>
  <div class="sidebar-container has-logo">
    <el-scrollbar wrap-class="scrollbar-wrapper" :class="['pc']">
      <div>sidebar</div>

      <el-menu
        router
        class="outer-most select-one el-menu-vertical-demo"
        unique-open
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="route.path"
      >
        <el-menu-item
          v-for="(item, index) in menuData"
          :key="item.id"
          :index="item.path"
        >
          <template #title>
            <el-icon><component :is="icons[index]" /></el-icon>
            <span> {{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { usePermissionStoreHook } from "@/stores/modules/permissions";

const icons = [Document, IconMenu, Location, Setting];
const isCollapse = ref(false);

const route = useRoute();
console.log(route, "route", route.path);

const menuData: any = computed(() => {
  return usePermissionStoreHook().wholeMenus;
});
</script>

<style scoped></style>
