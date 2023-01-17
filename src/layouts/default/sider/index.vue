<template>
  <!-- <el-radio-group v-model="settingStore.isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group> -->

  <!-- <el-button @click="changeCollapse"> chang collapse </el-button> -->
  <div
    class="cchLogo"
    :style="{
      width: settingStore.isCollapse ? '80px' : '200px',
      transition: 'auto 0.5s',
    }"
  >
    <img :src="logo" alt="cc" />
  </div>
  <h1
    :style="{
      width: settingStore.isCollapse ? '80px' : '200px',
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
      color: '#333',
      transition: 'width 0.5s',
      padding: '1em',
    }"
  >
    CCH - VUE - admin
  </h1>
  <el-menu
    default-active="2"
    class="el-menu-vertical bg-slate-400"
    :collapse="settingStore.isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1" @clcik="clickSubMenuItem">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
import { useSettingStore } from "@/stores/modules/setting";
import logo from "@/assets/logo.png";

const settingStore = useSettingStore();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const clickSubMenuItem = (e: any) => {
  console.log(e);
};
</script>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: calc(60vh);
}

.el-menu-vertical {
  border-right: none;
}

.cchLogo {
  padding: 1.5em;
  will-change: filter;
  margin: 10px auto;
}

.cchLogo img {
  display: block;
  width: 50%;
  margin: auto;
}

.cchLogo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
