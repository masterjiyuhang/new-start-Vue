<!-- 纵向布局 -->
<template>
  <el-container class="layout">
    <el-aside>
      <div
        class="menu"
        :style="{ width: ThemeConfig.isCollapse ? '65px' : '210px' }"
      >
        <div class="logo flex-c">
          <img src="@/assets/logo.png" alt="logo" />
          <span v-show="!ThemeConfig.isCollapse">{{ LAYOUT_CONFIG.appName }}</span>
        </div>
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :router="false"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
            :background-color="LAYOUT_CONFIG.sidebarColors.dark.bg"
            :text-color="LAYOUT_CONFIG.sidebarColors.dark.text"
            active-text-color="#ffffff"
          >
            <SubMenu :menuList="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <HeaderLeft />
        <HeaderRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SubMenu from "@/layouts/components/menu/SubMenu.vue";
import Main from "@/layouts/components/main/index.vue";
import HeaderLeft from "../components/header/HeaderLeft.vue";
import HeaderRight from "../components/header/HeaderRight.vue";
import { useLayoutState } from "../composables/useLayoutState";
import { useActiveMenu } from "../composables/useActiveMenu";
import { LAYOUT_CONFIG } from "../config";

const { ThemeConfig, isCollapse, menuList } = useLayoutState();
const activeMenu = useActiveMenu();
</script>

<style scoped lang="scss">
@use "./index";
</style>

<style lang="scss">
@use "../styles/menu-active" as menu;

.vertical {
  @include menu.menu-active-indicator(#060708);
}
</style>
