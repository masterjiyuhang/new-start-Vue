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
        <!-- <el-breadcrumb-item
          class="!inline !items-stretch"
          v-for="item in breadcrumbList"
          :key="item.path"
        >
          <a @click.prevent="handleLink(item)">
            {{ item.meta.title }}
          </a>
        </el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item :to="{ path: '/' }">AAAAAAA</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/">promotion management</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>

    <div>
      {{ multiTags }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useRouter, useRoute, RouteLocationMatched } from "vue-router";
import { emitter } from "@/utils/mitt";
import { useMultiTagsStoreHook } from "@/stores/modules/multiTags";
const route = useRoute();
const router = useRouter();
const routes: any = router.options.routes;
const breadcrumbList = ref<any[]>([
  {
    path: "/dashboard",
    meta: {
      title: "分析页",
    },
  },
  {
    path: "测试",
    meta: {
      title: "测试页面",
    },
  },
]);

const multiTags: any = computed(() => {
  return useMultiTagsStoreHook().multiTags;
});

// console.log(multiTags, "multiTags...");
const baseMultiTags: any = useMultiTagsStoreHook().multiTags;

console.log(baseMultiTags);

// const isDashboard = (route: RouteLocationMatched): boolean | string => {
//   const name = route && (route.name as string);
//   if (!name) return false;
//   return name.trim().toLocaleLowerCase() === "Welcome".toLocaleLowerCase();
// };

const handleLink = (item: RouteLocationMatched): void => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as any);
  } else {
    router.push(path);
  }
};

const initBreadcrumb = () => {};

// 页面挂载之前执行
onBeforeMount(() => {
  //  接收侧边栏切换传递过来的参数
  emitter.on("changeCurrentRoute", ({ routeInfo, parentPath }) => {
    console.log("接收侧边栏切换传递过来的参数", routeInfo, parentPath);
  });
});

onMounted(() => {
  initBreadcrumb();
});
</script>

<style lang="scss" scoped>
.cch-header {
  background-color: #bfa;
}
</style>
