<template>
  <div class="cch-header bg-slate-300">
    <div class="header-left">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            class="!inline !items-stretch"
            v-for="item in breadcrumbList"
            :key="item.path"
          >
            <a @click.prevent="handleLink(item)">
              {{ item.meta.title }}
            </a>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 新的面包屑 -->
        <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item
            class="!inline !items-stretch"
            v-for="item in myBreadcrumbList"
            :key="item.path"
          >
            <a @click.prevent="handleLink(item)">
              {{ item.meta.title }}
            </a>
          </el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
    </div>

    <div class="header-right">当前用户</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter, useRoute, RouteLocationMatched } from "vue-router";
import { emitter } from "@/utils/mitt";
import { useTagListsStoreHook } from "@/stores/modules/tagLists";
import { findRouteByPath, getParentPaths } from "@/router/utils";
import { useNav } from "@/hooks/useNav";

const route = useRoute();
const router = useRouter();
const defaultRoutes: any = router.options.routes;
const breadcrumbList = ref<any[]>([]);
const myBreadcrumbList = ref<any[]>([]);

const { isDashboard } = useNav();

const tagLists: any = computed(() => {
  return useTagListsStoreHook().tagLists;
});

const handleLink = (item: RouteLocationMatched): void => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as any);
  } else {
    router.push(path);
  }
};

const initBreadcrumb = () => {
  // 我自己的版本
  let currentRouteMatched = route.matched.filter((item) => {
    return item.meta && item.meta.title;
  });

  if (!isDashboard(currentRouteMatched[0])) {
    currentRouteMatched = [
      {
        path: "/dashboard",
        parentPath: "/",
        meta: { title: "加进去的首页" },
      } as unknown as RouteLocationMatched,
    ].concat(currentRouteMatched);
  }

  const res = currentRouteMatched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
  myBreadcrumbList.value = res;

  // 下面是pure admin的版本
  let currentRoute;
  const tagLists: any = useTagListsStoreHook().tagLists;

  // 当前页面的路由
  currentRoute = findRouteByPath(route.path, tagLists);
  // 父页面的路由信息 ['/', '/car']
  const parentRoutes = getParentPaths(route.path, defaultRoutes);

  let matched = [];
  // 获取每个父级路径对应的路由信息 并把他添加到最后要用的matched里面
  parentRoutes.forEach((path) => {
    if (path !== "/") {
      matched.push(findRouteByPath(path, defaultRoutes));
    }
  });

  // 判断当前页面是否是默认的首页 ? 如果是，就不用操作了。因为tagLists里面有默认的首页信息了 :  如果不是，就把当前页塞进去
  if (currentRoute?.path !== "/dashboard") matched.push(currentRoute);

  if (!isDashboard(matched[0])) {
    // 当前最后要用的信息里面没有默认的首页 手动添加一个
    matched = [
      {
        path: "/dashboard",
        parentPath: "/",
        meta: { title: "自己加进去的首页" },
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

  breadcrumbList.value = matched.filter(
    (item) => item?.meta && item?.meta.title !== false
  );
};

// 页面挂载之前执行
onBeforeMount(() => {
  //  接收侧边栏切换传递过来的参数  只有点击了menu才会触发
  emitter.on("changeCurrentRoute", ({ routeInfo, parentPath }) => {
    // 判断当前系统中存储的数据是否包含当前页面的信息
    const res = tagLists.value.some((item) => {
      return item.path === routeInfo;
    });

    // 如果不包含当前页面的信息 得想办法给他加进去
    function concatPath(defaultRoutes, currentPath, parentPath) {
      if (!res) {
        defaultRoutes.forEach((arrItem) => {
          const pathConcat = parentPath + arrItem.path;
          if (arrItem.path === currentPath || pathConcat === currentPath) {
            useTagListsStoreHook().handleTags("push", {
              path: currentPath,
              parentPath: `/${parentPath.split("/")[1]}`,
              meta: arrItem.meta,
              name: arrItem.name,
            });
          } else {
            if (arrItem.children && arrItem.children.length > 0) {
              concatPath(arrItem.children, currentPath, parentPath);
            }
          }
        });
      }
    }

    concatPath(defaultRoutes, routeInfo, parentPath);
  });
});

onMounted(() => {
  initBreadcrumb();
});

// 监听页面路由变化 动态变化面包屑内容
watch(
  () => route.path,
  () => {
    initBreadcrumb();
  }
);
</script>

<style lang="scss" scoped>
.cch-header {
  // background-color: #bfa;
  min-height: 60px;
  display: flex;
  justify-content: space-between;

  .header-left {
    float: left;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .header-right {
    display: flex;
    min-width: 280px;
    align-items: center;
    column-rule: #333;
    justify-content: flex-end;
  }
}
</style>
