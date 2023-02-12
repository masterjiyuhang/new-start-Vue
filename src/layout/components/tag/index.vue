<template>
  <div>this is tab</div>
</template>

<script setup lang="ts">
import { useMultiTagsStoreHook } from "@/stores/modules/multiTags";
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { emitter } from "@/utils/mitt";

const multiTags: any = computed(() => {
  return useMultiTagsStoreHook().multiTags;
});
const router = useRouter();

function dynamicRouteTag(value: string, parentPath: string): void {
  const hasValue = multiTags.value.some((item) => {
    return item.path === value;
  });

  function concatPath(arr: object[], value: string, parentPath: string) {
    if (!hasValue) {
      arr.forEach((arrItem: any) => {
        const pathConcat = parentPath + arrItem.path;
        if (arrItem.path === value || pathConcat === value) {
          useMultiTagsStoreHook().handleTags("push", {
            path: value,
            parentPath: `/${parentPath.split("/")[1]}`,
            meta: arrItem.meta,
            name: arrItem.name,
          });
        } else {
          if (arrItem.children && arrItem.children.length > 0) {
            concatPath(arrItem.children, value, parentPath);
          }
        }
      });
    }
  }
  concatPath(router.options.routes as any, value, parentPath);
}

onBeforeMount(() => {
  //  接收侧边栏切换传递过来的参数
  emitter.on("changLayoutRoute", ({ indexPath, parentPath }) => {
    console.log("接收侧边栏切换传递过来的参数", indexPath, parentPath);
    dynamicRouteTag(indexPath, parentPath);
  });
});
</script>

<style scoped></style>
