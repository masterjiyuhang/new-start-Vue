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
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item
          v-for="(item, index) in menuData"
          :key="item.id"
          :index="item.path"
        >
          <template #title>
            <el-icon><component :is="icons[index]" /></el-icon>
            <span
              >{{ item.meta.title
              }}{{ onlyOneChild(item, item.children) }}</span
            >
          </template>
        </el-menu-item>
        <!-- <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item> -->
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
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, "handleOpen");
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, "handleClose");
};

const route = useRoute();
console.log(route, "route", route.path);

const menuData: any = computed(() => {
  return usePermissionStoreHook().wholeMenus;
});

type childrenType = {
  path?: string;
  noShowingChildren?: boolean;
  children?: childrenType[];
  value: unknown;
  meta?: {
    icon?: string;
    title?: string;
    showParent?: boolean;
    extraIcon?: {
      svg?: boolean;
      name?: string;
    };
  };
  showTooltip?: boolean;
  parentId?: number;
  pathList?: number[];
};

const onlyOneChild = (parent: childrenType, children: childrenType[] = []) => {
  console.log(children, parent, "onlyOneChild ....");
  const showingChildren = children.filter((item: any) => {
    console.log(item);
    return true;
  });

  console.log(showingChildren, " showing chidlren");
};
</script>

<style scoped></style>
