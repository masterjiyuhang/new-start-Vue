<template>
  <div class="cch-header">
    <div>
      {{ breadcrumbList }}
      <el-breadcrumb separator="/">
        <!-- <div v-for="item in breadcrumbList" :key="item.id">
          {{ item }}
        </div> -->
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
    </div>

    <div>
      {{ tagLists }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter, useRoute, RouteLocationMatched } from "vue-router";
import { emitter } from "@/utils/mitt";
import { useTagListsStoreHook } from "@/stores/modules/tagLists";
import { findRouteByPath, getParentPaths } from "@/router/utils";

const route = useRoute();
const router = useRouter();
const defaultRoutes: any = router.options.routes;
const breadcrumbList = ref<any[]>([]);

const tagLists: any = computed(() => {
  return useTagListsStoreHook().tagLists;
});
const isDashboard = (route: RouteLocationMatched): boolean | string => {
  const name = route && (route.name as string);
  if (!name) return false;
  return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
};

const handleLink = (item: RouteLocationMatched): void => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as any);
  } else {
    router.push(path);
  }
};

const initBreadcrumb = () => {
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

  console.log(breadcrumbList.value, "breadcrumbList");
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

    console.log(useTagListsStoreHook().tagLists, "最后的结果。");
  });
});

onMounted(() => {
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
.cch-header {
  background-color: #bfa;
}
</style>
