<template>
  <div class="cch-tabs">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="handleCurrentTabName(item)"
        :label="item.meta.title"
        :name="handleCurrentTabName(item)"
      >
      </el-tab-pane>
    </el-tabs>

    <div style="margin-bottom: 20px">
      <el-button size="small" @click="addTab(editableTabsValue)">
        add tab{{ editableTabsValue }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { onMounted } from "vue";
import { ref } from "vue";
import { useNav } from "@/hooks/useNav";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { isDashboard } = useNav();

const handleCurrentTabName = (item) => {
  return (
    item.name.trim().toLocaleLowerCase() +
    JSON.stringify(item.query) +
    JSON.stringify(item.params)
  );
};

console.log(isDashboard(route as any), "asdasd");

onMounted(() => {
  emitter.on("changeSidebarCollapse", (value) => {
    console.log(value, "Tabs 中监听菜单是否折叠");
  });
});

const editableTabsValue = ref("Dashboard");
const editableTabs = ref([
  {
    name: "Dashboard",
    meta: {
      title: "分析页",
    },
    query: {},
    params: {},
  },
]);

let tabIndex = 1;
const addTab = (_targetName: string) => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    name: newTabName,
    meta: {
      title: "New Tab" + newTabName,
    },
    query: {},
    params: {},
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value;
  // let activeName = editableTabsValue.value;

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
    if (editableTabs.value.length === 1) {
      console.log(1111);
      router.push({ name: "dashboard" });
    } else {
      if (index < editableTabs.value.length - 1) {
        router.push({
          name: editableTabs.value[index + 1].name,
          query: editableTabs.value[index + 1].query,
          params: editableTabs.value[index + 1].params,
        });
      } else {
        router.push({
          name: editableTabs.value[index - 1].name,
          query: editableTabs.value[index - 1].query,
          params: editableTabs.value[index - 1].params,
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

  // editableTabsValue.value = activeName;
  // editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
  editableTabs.value.splice(index, 1);
};
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
