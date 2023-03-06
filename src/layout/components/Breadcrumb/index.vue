<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";

const route = useRoute();
const router = useRouter();
const levelList = ref<any>([]);

function isDashboard(route: any) {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim() === "dashboard";
}

function getBreadcrumb() {
  let matched: any = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
  const first = matched[0];

  if (!isDashboard(first)) {
    matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(matched);
  }

  levelList.value = matched.filter(
    (item: any) =>
      item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
}

function handleLink(item: any) {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(path);
}

getBreadcrumb();

watchEffect(() => {
  // if you go to the redirect page, do not update the breadcrumbs
  if (route.path.startsWith("/redirect/")) {
    return;
  }
  getBreadcrumb();
});
</script>

<style scoped lang="scss">
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
