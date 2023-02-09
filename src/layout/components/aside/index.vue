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
        @select="(indexPath) => menuSelect(indexPath, routers)"
      >
        <template v-for="(item, index) in menuData" :key="item.id">
          <!-- 单一菜单 -->
          <el-menu-item
            :index="item.path"
            v-if="hasOneShowingChild(item, item.children)"
          >
            <template #title>
              <el-icon><component :is="icons[index]" /></el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>

          <!-- 有子菜单 -->
          <el-sub-menu v-else ref="submenu" :index="item.path">
            <template #title>
              <el-icon><component :is="icons[index]" /></el-icon>
              {{ item.meta.title }}
            </template>

            <template
              v-for="(childItem, childIndex) in item.children"
              :key="childItem.id"
            >
              <el-menu-item :index="childItem.path">
                <template #title>
                  <el-icon><component :is="icons[childIndex]" /></el-icon>
                  <span>{{ childItem.meta.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { usePermissionStoreHook } from "@/stores/modules/permissions";
import { emitter } from "@/utils/mitt";

const icons = [Document, IconMenu, Location, Setting];
const isCollapse = ref(false);
const routers = useRouter().options.routes;
const route = useRoute();
// console.log(route, "route", route.path);

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
const onlyOneChild: childrenType = ref(null);

const hasOneShowingChild = (
  parent: childrenType,
  children: childrenType[] = []
) => {
  const showingChildren = children.filter((item: any) => {
    onlyOneChild.value = item;
    return true;
  });

  if (showingChildren[0]?.meta?.showParent) {
    return false;
  }

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};

// console.log(route, "route...");

const errorInfo = "当前路由配置不正确，请检查配置";
const menuSelect = (indexPath, routers) => {
  console.log(indexPath, routers, "菜单选择 有点机会的");

  let parentPath = "";
  const parentPathIndex = indexPath.lastIndexOf("/");
  if (parentPathIndex > 0) {
    parentPath = indexPath.slice(0, parentPathIndex);
  }

  /** 找到当前路由的信息 */
  function findCurrentRoute(indexPath: string, routes) {
    if (!routes) return console.error(errorInfo);
    return routes.map((item) => {
      if (item.path === indexPath) {
        if (item.redirect) {
          findCurrentRoute(item.redirect, item.children);
        } else {
          /** 切换左侧菜单 通知标签页 */
          emitter.emit("changLayoutRoute", {
            indexPath,
            parentPath,
          });
        }
      } else {
        if (item.children) findCurrentRoute(indexPath, item.children);
      }
    });
  }
  findCurrentRoute(indexPath, routers);
};
watch(
  () => [route.path],
  () => {
    console.log("路由变化了 哈哈哈哈");
  }
);
</script>

<style scoped></style>
