<template>
  <div class="navbar">
    <el-breadcrumb
      :separator-icon="ArrowRight"
      class="!leading-[50px] select-none !text-[18px] breadcrumb-container"
    >
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          class="!inline !items-stretch"
          v-for="item in levelList"
          :key="item.path"
        >
          <a @click.prevent="handleLink(item)">
            {{ item.meta.title }}
          </a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

    <div class="vertical-header-right">
      <el-dropdown trigger="click">
        <span> {{ levelList }} </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteLocationMatched } from "vue-router";
import { findRouteByPath, getParentPaths } from "@/router/utils";
import { useMultiTagsStoreHook } from "@/stores/modules/multiTags";

const route = useRoute();
const router = useRouter();
const levelList = ref<any[]>([]);
const routes: any = router.options.routes;

const isDashboard = (route: RouteLocationMatched): boolean | string => {
  const name = route && (route.name as string);
  if (!name) return false;
  return name.trim().toLocaleLowerCase() === "Welcome".toLocaleLowerCase();
};

const handleLink = (item: RouteLocationMatched): void => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as any);
  } else {
    router.push(path);
  }
};

const logout = () => {
  console.log("logout");
};

const initBreadcrumb = () => {
  console.log("init 开始");

  let currentRoute;
  const multiTags: any = useMultiTagsStoreHook().multiTags;

  currentRoute = findRouteByPath(route.path, multiTags);
  console.log(currentRoute, "计算出当前页面的路由信息");

  const parentRoutes = getParentPaths(route.path, routes);
  console.log(parentRoutes, "parentRoutes......");

  let matched = [];
  // 获取每个父级路径对应的路由信息
  parentRoutes.forEach((path) => {
    if (path !== "/") matched.push(findRouteByPath(path, routes));
  });

  console.log(matched);

  if (currentRoute?.path !== "/welcome") matched.push(currentRoute);

  console.log(matched);
  if (!isDashboard(matched[0])) {
    matched = [
      {
        path: "/welcome",
        parentPath: "/",
        meta: { title: "自己加进去的首页" },
      } as unknown as RouteLocationMatched,
    ].concat(matched);
  }

  console.log(matched, levelList, "level list. .");

  matched.forEach((item, index) => {
    if (currentRoute?.query || currentRoute?.params) return;
    if (item?.children) {
      item.children.forEach((v) => {
        if (v?.meta?.title === item?.meta?.title) {
          matched.splice(index, 1);
        }
      });
    }
  });

  levelList.value = matched.filter(
    (item) => item?.meta && item?.meta.title !== false
  );
};

onMounted(() => {
  // getBreadcrumb();
  initBreadcrumb();
});

watch(
  () => route.path,
  () => {
    initBreadcrumb();
  }
);
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
    font-size: 16px;
  }

  .vertical-header-right {
    display: flex;
    min-width: 280px;
    height: 48px;
    align-items: center;
    column-rule: #333;
    justify-content: flex-end;
  }
}
</style>
