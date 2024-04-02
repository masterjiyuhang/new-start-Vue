<template>
  <div class="wrapper-page">
    menu3
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">
        <component :is="t1"></component>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">
        <component :is="t2"></component>
      </el-tab-pane>
      <el-tab-pane label="Role" name="third">
        <router-view name="t1" />
      </el-tab-pane>
      <el-tab-pane label="Task" name="fourth"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useRouter } from "vue-router";
import t1 from "./t1.vue";
import t2 from "./t2.vue";

const router = useRouter();
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  const { label, name } = tab.props;

  console.log(label, event);
  switch (name) {
    case "third":
      router.push({
        name: "t1",
      });
      break;
    case "fourth":
      break;
    default:
      break;
  }
};
</script>

<style scoped></style>
