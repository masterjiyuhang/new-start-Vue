<template>
  <div class="cch-tabs">
    <div class="router-history">
      <el-tabs
        v-model="currentTab"
        :closable="!(tabList.length === 1 && $route.name === defaultRouter)"
        type="card"
        @contextmenu.prevent="openContextMenu($event)"
        @tab-click="changeTab"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="formatName(item)"
          :label="item.meta.title"
          :name="formatName(item)"
          :tab="item"
          class="gva-tab"
        >
          <template #label>
            <span
              :tab="item"
              :style="{
                color: currentTab === formatName(item) ? 'red' : '#333',
              }"
              ><i
                class="dot"
                :style="{
                  backgroundColor:
                    currentTab === formatName(item) ? '#bfa' : '#ddd',
                }"
              />
              {{ fmtTitle(item.meta.title, item) }}</span
            >
          </template>
        </el-tab-pane>
      </el-tabs>

      <!--自定义右键菜单html代码-->
      <ul
        v-show="contextMenuVisible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li @click="closeAll">关闭所有</li>
        <li @click="closeLeft">关闭左侧</li>
        <li @click="closeRight">关闭右侧</li>
        <li @click="closeOther">关闭其他</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";

const route = useRoute();
const router = useRouter();
const tabList = ref([]);
const currentTab = ref("");
const defaultRouter = ref("dashboard");
const contextMenuVisible = ref(false);
const { isCollapse } = storeToRefs(useGlobalSettingStore());
const left = ref(0);
const top = ref(0);
const rightActive = ref("");

const openContextMenu = (e) => {
  if (tabList.value.length === 1 && route.name === defaultRouter.value) {
    return false;
  }
  let id = "";
  if (e.srcElement.nodeName === "SPAN") {
    id = e.srcElement.offsetParent.id;
  } else {
    id = e.srcElement.id;
  }
  if (id) {
    contextMenuVisible.value = true;
    let width;
    if (isCollapse.value) {
      width = 54;
    } else {
      width = 220;
    }

    left.value = e.clientX - width;
    top.value = e.clientY + 10;
    rightActive.value = id.substring(4);
  }
};
const closeAll = () => {
  tabList.value = [
    {
      name: defaultRouter.value,
      meta: {
        title: "分析页",
      },
      query: {},
      params: {},
    },
  ];
  router.push({ name: defaultRouter.value });
  contextMenuVisible.value = false;
  sessionStorage.setItem("tabList", JSON.stringify(tabList.value));
};
const closeLeft = () => {
  let right;
  const rightIndex = tabList.value.findIndex((item) => {
    if (formatName(item) === rightActive.value) {
      right = item;
    }
    return formatName(item) === rightActive.value;
  });
  const activeIndex = tabList.value.findIndex(
    (item) => formatName(item) === currentTab.value
  );
  tabList.value.splice(0, rightIndex);
  if (rightIndex > activeIndex) {
    router.push(right);
  }
  sessionStorage.setItem("tabList", JSON.stringify(tabList.value));
};
const closeRight = () => {
  let right;
  const leftIndex = tabList.value.findIndex((item) => {
    if (formatName(item) === rightActive.value) {
      right = item;
    }
    return formatName(item) === rightActive.value;
  });
  const activeIndex = tabList.value.findIndex(
    (item) => formatName(item) === currentTab.value
  );
  tabList.value.splice(leftIndex + 1, tabList.value.length);
  if (leftIndex < activeIndex) {
    router.push(right);
  }
  sessionStorage.setItem("tabList", JSON.stringify(tabList.value));
};
const closeOther = () => {
  let right;
  tabList.value = tabList.value.filter((item) => {
    if (formatName(item) === rightActive.value) {
      right = item;
    }
    return formatName(item) === rightActive.value;
  });
  router.push(right);
  sessionStorage.setItem("tabList", JSON.stringify(tabList.value));
};

const formatName = (item) => {
  return item.name + JSON.stringify(item.query) + JSON.stringify(item.params);
};

const setTab = (route) => {
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
  const flag = tabList.value.some((item) => isSame(item, route));

  if (!flag) {
    const obj: any = {};
    obj.name = route.name;
    obj.meta = { ...route.meta };
    delete obj.meta.matched;
    obj.query = route.query;
    obj.params = route.params;
    tabList.value.push(obj);
  }

  window.sessionStorage.setItem("currentTab", formatName(route));
};

const fmtTitle = (title, now) => {
  const reg = /\$\{(.+?)\}/;
  const reg_g = /\$\{(.+?)\}/g;
  const result = title.match(reg_g);
  if (result) {
    result.forEach((item) => {
      const key = item.match(reg)[1];
      const value = now.params[key] || now.query[key];
      title = title.replace(item, value);
    });
  }
  return title;
};

const changeTab = (TabsPaneContext) => {
  const name = TabsPaneContext?.props?.name;
  if (!name) return;
  const tab = historyMap.value[name];
  router.push({
    name: tab.name,
    query: tab.query,
    params: tab.params,
  });
};
const removeTab = (tab) => {
  contextMenuVisible.value = false;
  const index = tabList.value.findIndex((item) => formatName(item) === tab);
  if (formatName(route) === tab) {
    if (tabList.value.length === 1) {
      router.push({ name: defaultRouter.value });
    } else {
      if (index < tabList.value.length - 1) {
        router.push({
          name: tabList.value[index + 1].name,
          query: tabList.value[index + 1].query,
          params: tabList.value[index + 1].params,
        });
      } else {
        router.push({
          name: tabList.value[index - 1].name,
          query: tabList.value[index - 1].query,
          params: tabList.value[index - 1].params,
        });
      }
    }
  }
  tabList.value.splice(index, 1);
};

const initTabs = () => {
  const initTabsList = [
    {
      name: "dashboard",
      meta: {
        title: "分析页",
      },
      query: {},
      params: {},
    },
  ];
  tabList.value = JSON.parse(sessionStorage.getItem("tabList")) || initTabsList;

  if (!window.sessionStorage.getItem("currentTab")) {
    currentTab.value = formatName(route);
  } else {
    currentTab.value = window.sessionStorage.getItem("currentTab");
  }

  setTab(route);

  if (window.sessionStorage.getItem("needCloseAll") === "true") {
    closeAll();
    window.sessionStorage.removeItem("needCloseAll");
  }
};

watch(
  () => contextMenuVisible.value,
  () => {
    if (contextMenuVisible.value) {
      document.body.addEventListener("click", () => {
        contextMenuVisible.value = false;
      });
    } else {
      document.body.removeEventListener("click", () => {
        contextMenuVisible.value = false;
      });
    }
  }
);

watch(
  () => route,
  (to) => {
    if (to.name === "Login" || to.name === "Reload") {
      return;
    }
    tabList.value = tabList.value.filter((item) => !item.meta.closeTab);
    setTab(to);
    sessionStorage.setItem("tabList", JSON.stringify(tabList.value));
    currentTab.value = window.sessionStorage.getItem("currentTab");
  },
  { deep: true }
);

const historyMap = ref({});
watch(
  () => tabList.value,
  () => {
    historyMap.value = {};
    tabList.value.forEach((item) => {
      historyMap.value[formatName(item)] = item;
    });
  },
  {
    deep: true,
  }
);
onMounted(() => {
  initTabs();
});
</script>

<style lang="scss">
$border-color: #f4f4f4;
$height-nav-scroll: 40px;

@include cch.b(tabs) {
  background-color: #fff;
  color: aliceblue;

  .router-history {
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    background: rgb(255, 255, 255);
    padding: 0 6px;
    border-top: 1px solid $border-color;
    padding: 0;
    .el-tabs {
      background-color: #fff;
      .el-tabs__header {
        margin: 0px 0 0 0;
        border: none;

        .el-tabs__item {
          background-color: rgba(64, 158, 255, 0.08);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
          border-radius: 5px;
          height: $height-nav-scroll;
          height: $height-nav-scroll;
          + .el-tabs__item {
            border-left: 0px solid $border-color;
          }
        }
        .el-tabs__item.is-active {
          background-color: rgba(136, 216, 185, 0.39);
        }
        .el-tabs__nav {
          border: none;
        }
      }
    }
  }
  .contextmenu {
    width: 100px;
    margin: 0;
    border: 1px solid #ccc;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
  }
  .el-tabs__item .el-icon-close {
    color: initial !important;
  }
  .el-tabs__item .dot {
    content: "";
    width: 9px;
    height: 9px;
    margin-right: 8px;
    display: inline-block;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .contextmenu li {
    margin: 0;
    padding: 7px 16px;
  }
  .contextmenu li:hover {
    background: #f2f2f2;
    cursor: pointer;
  }
}
</style>
