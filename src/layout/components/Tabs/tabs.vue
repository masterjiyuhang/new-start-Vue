<template>
  <div class="cch-base-tabs">
    <div
      v-for="(item, index) in initTabList"
      :ref="'tabItem' + (index + 1)"
      :key="index"
      class="cch-base-tabs__tabItem"
      :class="[
        item.name === route.name ? 'isActive' : '', // selected 颜色
        activeTabIndex === index + 1 ? 'bg-slate-500' : '', // hover 颜色
      ]"
      @mouseenter.prevent="
        () => {
          isHover = true;
          activeTabIndex = index + 1;
        }
      "
      @mouseleave.prevent="
        () => {
          activeTabIndex = -1;
          isHover = false;
        }
      "
      @click="handleClickTab(item)"
    >
      <div class="">
        <!-- {{ activeTab }} -->
        {{ item.meta.title }}
        <span
          v-show="initTabList.length > 1"
          class="ml-2"
          @click="handleRemoveTab(item)"
          >X</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMultiTagsStore } from "@/stores/modules/tabs";
const route = useRoute();
const router = useRouter();

const { getMultiTagList } = useMultiTagsStore();

console.log(getMultiTagList, "tag list ");

const initTabList = ref<any[]>([]);
const isHover = ref<boolean>(false);
const activeTabIndex = ref<number>();
const activeTab = ref<number | string>("dashboard");

// 初始化
const initTab = () => {
  console.log("初始化tab方法 initTab");
  // initTabList.value.push({
  //   name: "dashboard",
  //   meta: {
  //     title: "统计页",
  //   },
  //   query: {},
  //   params: {},
  // });
};

const handleClickTab = (tab: any) => {
  router.push({
    name: tab.name,
    query: tab.query,
    params: tab.params,
  });
};

const handleRemoveTab = (tab: any) => {
  console.log(tab.name, "remove tab");

  const index = initTabList.value.findIndex((item) => item.name === tab.name);
  initTabList.value.splice(index, 1);

  console.log(initTabList.value, "zxcxczxczxczxc");

  const newRoute = initTabList.value.slice(-1);
  const routeItem = {
    name: newRoute[0].name,
    query: newRoute[0]?.query ?? {},
    params: newRoute[0]?.params ?? {},
  };
  console.log(routeItem, "new ");
  router.push(routeItem);
};

watch(
  () => route,
  (newVal) => {
    console.log("监听路有变化！！！！！！");
    const currentInfo = {
      name: newVal.name,
      meta: {
        title: newVal.meta.title,
      },
      query: newVal.query,
      params: newVal.params,
    };

    // 想标签组中添加当前标签 需要判断是否已经有这个标签了
    const notFlag = initTabList.value.some((item) => item.name === newVal.name);
    !notFlag && initTabList.value.push(currentInfo);
    activeTab.value = (newVal.name as string) ?? "dashboard";
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  initTab();
});
</script>

<style lang="scss" scoped>
$base-tabs-height: 60px;

@include cch.b(base-tabs) {
  height: $base-tabs-height;
  box-shadow: 0px 2px 8px 0px rgba(92, 105, 167, 0.15);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @include cch.e(tabItem) {
    border: 1px solid #333;
    border-radius: 4px;
    color: #333;
    width: 120px;
    text-align: center;

    cursor: pointer;
  }

  .isActive {
    background-color: #f80;
    color: #fff;
  }
}
</style>
