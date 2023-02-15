<template>
  <div class="router-history">
    <el-tabs
      v-model="activeValue"
      type="card"
      class="demo-tabs bg-slate-300"
      :closable="
        !(
          currentState.tabLists.length === 1 &&
          currentRouteName === currentState.defaultRouter
        )
      "
      @contextmenu.prevent="openContextMenu($event)"
      @tab-click="changeTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in currentState.tabLists"
        :key="formatName(item)"
        :label="item.meta.title"
        :name="formatName(item)"
      >
        <template #label>
          <span
            :tab="item"
            :style="{
              color: activeValue === formatName(item) ? '#f80' : '#333',
            }"
            ><i
              class="dot"
              :style="{
                backgroundColor:
                  activeValue === formatName(item) ? '#bfa' : '#ddd',
              }"
            />
            {{ fmtTitle(item.meta.title, item) }}</span
          >
        </template>
      </el-tab-pane>
    </el-tabs>
    <ul
      v-show="contextMenuVisible"
      :style="{ left: currentState.left + 'px', top: currentState.top + 'px' }"
      class="contextmenu"
    >
      <li @click="closeAll">关闭所有</li>
      <li @click="closeLeft">关闭左侧</li>
      <li @click="closeRight">关闭右侧</li>
      <li @click="closeOther">关闭其他</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { emitter } from "@/utils/mitt";
import { computed, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

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

const route = useRoute();
const router = useRouter();

console.log(route, "route ///");
const currentRouteName = computed(() => {
  return route.name;
});

const activeValue = ref("");
const contextMenuVisible = ref(false);

const formatName = (item) => {
  return item.name + JSON.stringify(item.query) + JSON.stringify(item.params);
};

const openContextMenu = (e) => {
  console.log(e, "openContextMenu");
  if (
    currentState.tabLists.length === 1 &&
    route.name === currentState.defaultRouter
  ) {
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
    if (currentState.isCollapse) {
      width = 54;
    } else {
      width = 220;
    }
    if (currentState.isMobile) {
      width = 0;
    }

    console.log(e.clientX, "asdasdasd");
    currentState.left = e.clientX - width + 200;
    currentState.left = e.clientX;
    currentState.top = e.clientY + 10;
    currentState.rightActive = id.substring(4);
  }
};

const currentState = reactive({
  left: 0,
  top: 0,
  isCollapse: false,
  rightActive: "",
  defaultRouter: "dashboard",
  tabLists: [],
  isMobile: false,
});

const closeAll = () => {
  currentState.tabLists = [
    {
      name: currentState.defaultRouter,
      meta: {
        title: "首页",
      },
      query: {},
      params: {},
    },
  ];
  router.push({ name: currentState.defaultRouter });
  contextMenuVisible.value = false;
  sessionStorage.setItem("historys", JSON.stringify(currentState.tabLists));
};
const closeLeft = () => {
  let right;
  const rightIndex = currentState.tabLists.findIndex((item) => {
    if (formatName(item) === currentState.rightActive) {
      right = item;
    }
    return formatName(item) === currentState.rightActive;
  });
  const activeIndex = currentState.tabLists.findIndex(
    (item) => formatName(item) === activeValue.value
  );
  currentState.tabLists.splice(0, rightIndex);
  if (rightIndex > activeIndex) {
    router.push(right);
  }
  sessionStorage.setItem("historys", JSON.stringify(currentState.tabLists));
};
const closeRight = () => {
  let right;
  const leftIndex = currentState.tabLists.findIndex((item) => {
    if (formatName(item) === currentState.rightActive) {
      right = item;
    }
    return formatName(item) === currentState.rightActive;
  });
  const activeIndex = currentState.tabLists.findIndex(
    (item) => formatName(item) === activeValue.value
  );
  currentState.tabLists.splice(leftIndex + 1, currentState.tabLists.length);
  if (leftIndex < activeIndex) {
    router.push(right);
  }
  sessionStorage.setItem("historys", JSON.stringify(currentState.tabLists));
};
const closeOther = () => {
  let right;
  currentState.tabLists = currentState.tabLists.filter((item) => {
    if (formatName(item) === currentState.rightActive) {
      right = item;
    }
    return formatName(item) === currentState.rightActive;
  });
  router.push(right);
  sessionStorage.setItem("historys", JSON.stringify(currentState.tabLists));
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

const setTab = (route) => {
  if (!currentState.tabLists.some((item) => isSame(item, route))) {
    const obj = {
      name: "",
      meta: {
        matched: false,
      },
      query: {},
      params: {},
    };
    obj.name = route.name;
    obj.meta = { ...route.meta };
    delete obj.meta.matched;
    obj.query = route.query;
    obj.params = route.params;
    currentState.tabLists.push(obj);
  }
  window.sessionStorage.setItem("activeValue", formatName(route));
};

const historyMap = ref({});

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
  const index = currentState.tabLists.findIndex(
    (item) => formatName(item) === tab
  );
  if (formatName(route) === tab) {
    if (currentState.tabLists.length === 1) {
      router.push({ name: currentState.defaultRouter });
    } else {
      if (index < currentState.tabLists.length - 1) {
        router.push({
          name: currentState.tabLists[index + 1].name,
          query: currentState.tabLists[index + 1].query,
          params: currentState.tabLists[index + 1].params,
        });
      } else {
        router.push({
          name: currentState.tabLists[index - 1].name,
          query: currentState.tabLists[index - 1].query,
          params: currentState.tabLists[index - 1].params,
        });
      }
    }
  }
  currentState.tabLists.splice(index, 1);
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
  (to, now) => {
    if (to.name === "Login" || to.name === "Reload") {
      return;
    }
    currentState.tabLists = currentState.tabLists.filter(
      (item) => !item.meta.closeTab
    );
    setTab(to);
    sessionStorage.setItem("historys", JSON.stringify(currentState.tabLists));
    activeValue.value = window.sessionStorage.getItem("activeValue");
  },
  { deep: true }
);

watch(
  () => currentState.tabLists,
  () => {
    sessionStorage.setItem("historys", JSON.stringify(currentState.tabLists));
    historyMap.value = {};
    currentState.tabLists.forEach((item) => {
      historyMap.value[formatName(item)] = item;
    });
    emitter.emit("setKeepAlive", currentState.tabLists);
  },
  {
    deep: true,
  }
);

const initTabs = () => {
  // 全局监听 关闭当前页面函数
  emitter.on("closeThisPage", () => {
    removeTab(formatName(route));
  });
  // 全局监听 关闭所有页面函数
  emitter.on("closeAllPage", () => {
    closeAll();
  });
  emitter.on("mobile", (data) => {
    currentState.isMobile = data;
  });
  emitter.on("collapse", (data) => {
    currentState.isCollapse = data;
  });

  const initTabList = [
    {
      name: currentState.defaultRouter,
      meta: {
        title: "首页",
      },
      query: {},
      params: {},
    },
  ];

  currentState.tabLists =
    JSON.parse(sessionStorage.getItem("tabList")) || initTabList;

  if (!window.sessionStorage.getItem("activeValue")) {
    activeValue.value = formatName(route);
  } else {
    activeValue.value = window.sessionStorage.getItem("activeValue");
  }

  setTab(route);

  if (window.sessionStorage.getItem("needCloseAll") === "true") {
    closeAll();
    window.sessionStorage.removeItem("needCloseAll");
  }
};

initTabs();

onUnmounted(() => {
  emitter.off("collapse");
  emitter.off("mobile");
});
</script>

<style lang="scss">
$border-color: #eee;
$height-nav-scroll: 40px;

.router-history {
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: #fff;
  padding: 0 6px;
  border-top: 1px solid $border-color;
  padding: 0;
  .el-tabs__header {
    margin: 0px 0 0 0;
    .el-tabs__item {
      height: $height-nav-scroll;
      height: $height-nav-scroll;
      border: none;
      border-left: 1px solid $border-color;
      border-right: 1px solid $border-color;
      + .el-tabs__item {
        border-left: 0px solid $border-color;
      }
    }
    .el-tabs__item.is-active {
      background-color: rgba(64, 158, 255, 0.08);
    }
    .el-tabs__nav {
      border: none;
    }
  }
}

.demo-tabs {
  background-color: #fff;
  height: 60px;
  display: flex;
  align-items: center;

  .el-tabs__header {
    margin-bottom: 0;
  }
}

.demo-tabs .el-tabs__header {
  margin-bottom: 0;
  color: red;
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
</style>
