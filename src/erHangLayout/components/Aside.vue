<template>
  <el-menu
    unique-opened
    class="el-menu-cch"
    :default-active="menuDefaultSetting.menuDefaultActive"
    :collapse="isCollapse"
    :popper-effect="menuDefaultSetting.menuPopperMode"
    router
    @select="menuSelect"
  >
    {{ menuDefaultSetting.menuDefaultActive }}
    <template v-for="item in baseRoutes" :key="item.path">
      <el-menu-item :index="item.path" v-if="!item.children">
        <el-icon><document /></el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu :index="item.path" v-else>
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <div v-for="childItem in item.children" :key="childItem.path">
          <el-menu-item :index="childItem.path">
            <el-icon><icon-menu /></el-icon>
            <span>{{ childItem.meta.title }}</span></el-menu-item
          >
        </div>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { Document, Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { emitter } from "@/utils/mitt";

const isCollapse = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const routers = useRouter().options.routes;
const baseRoutes: RouteRecordRaw[] = router.options.routes[0].children;

const menuDefaultSetting = reactive({
  menuDefaultActive: route.path, // 默认展开项
  menuPopperMode: "dark", // 	dark / light
});

const menuSelect = (indexPath: any, routers) => {
  // console.log(routers, "routers");
  let parentPath = "";
  const parentPathIndex = indexPath.lastIndexOf("/");
  if (parentPathIndex > 0) {
    parentPath = indexPath.slice(0, parentPathIndex);
  }

  // 设置当前路由信息
  menuDefaultSetting.menuDefaultActive = indexPath;

  /** 找到当前路由的信息 */
  function findCurrentRoute(indexPath: string, routes) {
    const errorInfo = "当前路由配置不正确，请检查配置";
    if (!routes) return console.error(errorInfo);
    return routes.map((item) => {
      if (item.path === indexPath) {
        if (item.redirect) {
          findCurrentRoute(item.redirect, item.children);
        } else {
          /** 切换左侧菜单 通知标签页 */
          emitter.emit("changeCurrentRoute", {
            routeInfo: indexPath,
            parentPath,
          });
        }
      } else {
        if (item.children) findCurrentRoute(indexPath, item.children);
      }
    });
  }

  // emitter.emit("changeCurrentRoute", { routeInfo: indexPath, parentPath });
  findCurrentRoute(indexPath, routers);
};

watch(
  () => [route.path],
  () => {
    menuSelect(route.path, routers);
  }
);
</script>

<style lang="scss" scoped>
.el-menu-cch {
  --el-menu-bg-color: #eee;
}
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>
