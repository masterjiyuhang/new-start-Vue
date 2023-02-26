<template>
  <div class="cch-tabs">
    <el-tabs
      v-model="currentTab"
      type="card"
      @tab-remove="removeTab"
      @tab-click="clickTab"
      @tab-change="changeTab"
    >
      <el-tab-pane
        v-for="item in tablist"
        :closable="item.name !== 'dashboard'"
        :key="handleCurrentTabName(item)"
        :label="item.meta.title"
        :name="handleCurrentTabName(item)"
      >
        <template #label>{{ item.meta.title }}{{ item.name }} </template>
      </el-tab-pane>
    </el-tabs>

    <div style="margin-bottom: 20px">
      <el-button size="small">{{ currentTab }} </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { onMounted, watch } from "vue";
import { ref } from "vue";
import { useNav } from "@/hooks/useNav";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { isDashboard } = useNav();

const handleCurrentTabName = (item) => {
  return (
    item.name.trim().toLocaleLowerCase() +
    "||||||" +
    JSON.stringify(item.query) +
    "||||||" +
    JSON.stringify(item.query)
  );
};

const currentTab = ref("");
const tablist = ref([]);

const removeTab = (targetName: string) => {
  const tabs = tablist.value;
  // let activeName = currentTab.value;

  // 找到当前tab对应的index
  const index = tabs.findIndex((item) => {
    return handleCurrentTabName(item) === targetName;
  });

  console.log(targetName, "tar get name");

  console.log(
    route,
    "当前路由信息",
    handleCurrentTabName(route) === targetName
  );

  if (handleCurrentTabName(route) === targetName) {
    if (tablist.value.length === 1) {
      router.push({ name: "dashboard" });
    } else {
      if (index < tablist.value.length - 1) {
        router.push({
          name: tablist.value[index + 1].name,
          query: tablist.value[index + 1].query,
          params: tablist.value[index + 1].params,
        });
      } else {
        router.push({
          name: tablist.value[index - 1].name,
          query: tablist.value[index - 1].query,
          params: tablist.value[index - 1].params,
        });
      }
    }
  }
  // if (activeName === targetName) {
  //   tabs.forEach((tab, index) => {
  //     if (tab.name === targetName) {
  //       const nextTab = tabs[index + 1] || tabs[index - 1];
  //       if (nextTab) {
  //         activeName = nextTab.name;
  //       }
  //     }
  //   });
  // }

  // currentTab.value = activeName;
  // tablist.value = tabs.filter((tab) => tab.name !== targetName);
  tablist.value.splice(index, 1);
};

const clickTab = (TabsPaneContext) => {
  console.log("click", TabsPaneContext);
  const name = TabsPaneContext?.props?.name;

  if (!name) return;
  const clickInfo = name.split("||||||");
  // 还得接着处理 最后不行就得map了
  router.push({
    name: clickInfo[0],
    query: JSON.parse(clickInfo[1]),
    params: JSON.parse(clickInfo[2]),
  });
  console.log(currentTab.value.split("||||||"));
};
const changeTab = (e) => {
  console.log("change", e);
};

const isSame = (route1, route2) => {
  if (route1.name !== route2.name) {
    return false;
  }
  if (
    Object.keys(route1.query).length !== Object.keys(route2.query).length ||
    Object.keys(route1.params).length !== Object.keys(route2.params).length
  ) {
    return false;
  }
  for (const key in route1.query) {
    if (route1.query[key] !== route2.query[key]) {
      return false;
    }
  }
  for (const key in route1.params) {
    if (route1.params[key] !== route2.params[key]) {
      return false;
    }
  }
  return true;
};

watch(
  () => route,
  (to) => {
    // console.log(
    //   now,
    //   tablist.value.some((item) => isSame(item, to))
    // );
    if (!tablist.value.some((item) => isSame(item, to))) {
      const CurrentRouteItem = {
        name: to.name,
        meta: {
          title: to.meta.title || "meta中没有名字",
        },
        query: to.query,
        params: to.params,
      };
      tablist.value.push(CurrentRouteItem);
      currentTab.value = handleCurrentTabName(to);
    }
  },
  { deep: true }
);
onMounted(() => {
  // 如果是分析页 直接添加
  if (isDashboard(route as any)) {
    console.log("isDashboard");
    tablist.value = [
      {
        name: "dashboard",
        meta: {
          title: "分析页",
        },
        query: {},
        params: {},
      },
    ];
  } else {
    // 其他页面 添加路由信息进来呗
    const { name, meta, query, params } = route;
    tablist.value.push({
      name,
      meta,
      query: { ...query },
      params,
    });
  }

  console.log(handleCurrentTabName(route), "handleCurrentTabName(route)");
  currentTab.value = handleCurrentTabName(route);
  emitter.on("changeSidebarCollapse", (value) => {
    console.log(value, "Tabs 中监听菜单是否折叠");
  });
});
</script>

<style lang="scss">
$border-color: #f4f4f4;
$height-nav-scroll: 40px;

@include cch.b(tabs) {
  background-color: #fff;
  color: red;

  .el-tabs__header {
    margin: 0px 0 0 0;
    .el-tabs__item {
      height: $height-nav-scroll;
      height: $height-nav-scroll;
      border: none;
      border-left: 1px solid $border-color;
      border-radius: 10px;
      border-right: 1px solid $border-color;
      box-shadow: 0px 0px 20px 10px teal inset;
      + .el-tabs__item {
        border-left: 0px solid $border-color;
      }
    }
    .el-tabs__item.is-active {
      background-color: rgb(247, 216, 234);
      color: red;
    }
    .el-tabs__nav {
      border: none;
    }
  }

  .el-tabs__content {
    display: none;
  }
}
</style>
