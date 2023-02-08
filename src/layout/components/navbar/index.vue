<template>
  <div class="navbar">
    <el-breadcrumb
      :separator-icon="ArrowRight"
      class="!leading-[50px] select-none !text-[18px] breadcrumb-container"
    >
      <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->

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
        <span>哈哈</span>
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
import { onMounted, ref, toRaw, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteLocationMatched } from "vue-router";
import { findRouteByPath, getParentPaths } from "@/router/utils";
import { isEqual } from "@pureadmin/utils";

const route = useRoute();
const router = useRouter();
const levelList = ref<any[]>([]);
const routes: any = router.options.routes;
const multiTags: any = [
  ...[
    {
      path: "/welcome",
      parentPath: "/",
      meta: {
        title: "首页",
        icon: "homeFilled",
      },
    },
  ],
];

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

const getBreadcrumb = (): void => {
  console.log("获取面包屑", routes);
  // 当前路由信息
  let currentRoute;

  if (Object.keys(route.query).length > 0) {
    console.log("query > 0");

    multiTags.forEach((item) => {
      if (isEqual(route.query, item?.query)) {
        currentRoute = toRaw(item);
      }
    });
  } else if (Object.keys(route.params).length > 0) {
    console.log("params > 0");

    multiTags.forEach((item) => {
      if (isEqual(route.params, item?.params)) {
        currentRoute = toRaw(item);
      }
    });
  } else {
    // console.log(router.currentRoute.value.path);
    currentRoute = findRouteByPath(router.currentRoute.value.path, multiTags);
  }

  // 当前路由的父级路径组成的数组
  const parentRoutes = getParentPaths(router.currentRoute.value.path, routes);

  // 存放组成面包屑的数组
  let matched = [] as any[];

  // 获取每个父级路径对应的路由信息
  parentRoutes.forEach((path) => {
    if (path !== "/") {
      //   console.log(path, routes);
      //   const res = findRouteByPath(path, routes);
      //   console.log(res, "res..");
      matched.push(findRouteByPath(path, routes));
    }
  });

  if (currentRoute?.path !== "/welcome") matched.push(currentRoute);

  if (!isDashboard(matched[0])) {
    matched = [
      {
        path: "/welcome",
        parentPath: "/",
        meta: { title: "首页" },
      } as unknown as RouteLocationMatched,
    ].concat(matched);
  }

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
  getBreadcrumb();
});

watch(
  () => route.path,
  () => {
    getBreadcrumb();
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
