<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        v-model="tabsMenuValue"
        type="card"
        @tab-click="tabClick"
        @tab-remove="tabRemove"
      >
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <el-icon
              class="tabs-icon"
              v-show="item.icon && ThemeConfig.tabsIcon"
            >
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { TabsPaneContext } from "element-plus";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { AuthStore } from "@/stores/modules/auth";
import { useTabsStore } from "@/stores/modules/tabs";
import { storeToRefs } from "pinia";
import MoreButton from "./components/MoreButton.vue";
// import { isFunction } from "@/utils/is";

const route = useRoute();
const router = useRouter();
const tabsMenuValue = ref(route.fullPath);
const authStore = AuthStore();
const tabsStore = useTabsStore();

const tabsMenuList = computed(() => tabsStore.tabsMenuList);
const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
const { removeKeepAliveName, addKeepAliveName } = useGlobalSettingStore();

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string;
  router.push(fullPath);
};

// console.log(router.currentRoute.value.params.id, route.meta, "route......");

// 当前路由元信息内的id  如果是详情页会用到
const currentId = computed(() => {
  return route.meta.isDetail ? router.currentRoute.value.params.id : "";
});

// Remove Tab
const tabRemove = (fullPath: string) => {
  const name =
    tabsStore.tabsMenuList.filter((item) => item.path == fullPath)[0].name ||
    "";
  removeKeepAliveName(name);
  tabsStore.removeTabs(fullPath, fullPath == route.fullPath);
};

// 初始化需要固定的标签
const initTabs = () => {
  authStore.flatMenuListGet.forEach((item) => {
    if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix,
      };

      tabsStore.addTabs(tabParams);
    }
  });
};

// 标签拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector(".el-tabs__nav") as HTMLElement, {
    draggable: ".el-tabs__item",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabsStore.tabsMenuList];
      const currRow = tabsList.splice(oldIndex as number, 1)[0];
      tabsList.splice(newIndex as number, 0, currRow);
      tabsStore.setTabs(tabsList);
    },
  });
};

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    // console.log(route.meta, "路由元信息");
    if (route.meta.isFull) return;
    tabsMenuValue.value = route.fullPath;
    const tabsParams = {
      icon: route.meta.icon as string,
      title: currentId.value
        ? (route.meta.title as string) + currentId.value
        : (route.meta.title as string),
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
    };
    tabsStore.addTabs(tabsParams);
    route.meta.isKeepAlive && addKeepAliveName(route.name as string);
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  tabsDrop();
  initTabs();
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
