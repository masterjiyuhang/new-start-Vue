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
            <el-icon><icon-menu /></el-icon
            >{{ childItem.meta.title }}</el-menu-item
          >
        </div>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Document, Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { emitter } from "@/utils/mitt";

const menuDefaultSetting = reactive({
  menuDefaultActive: "/car/detail", // 默认展开项
  menuPopperMode: "dark", // 	dark / light
});

const isCollapse = ref<boolean>(false);

const router = useRouter();
const baseRoutes: RouteRecordRaw[] = router.options.routes[0].children;

const menuSelect = (indexPath: any) => {
  let parentPath = "";
  const parentPathIndex = indexPath.lastIndexOf("/");
  if (parentPathIndex > 0) {
    parentPath = indexPath.slice(0, parentPathIndex);
  }

  menuDefaultSetting.menuDefaultActive = indexPath;
  emitter.emit("changeCurrentRoute", { routeInfo: indexPath, parentPath });
};
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
