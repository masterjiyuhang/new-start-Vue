<!-- 经典布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="header-lf">
        <div class="logo flex-c">
          <img src="@/assets/logo.png" alt="logo" />
          <span>{{ LAYOUT_CONFIG.appName }}</span>
        </div>
        <HeaderLeft />
      </div>
      <HeaderRight />
    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <div
          class="menu"
          :style="{ width: ThemeConfig.isCollapse ? '65px' : '210px' }"
        >
          <el-scrollbar>
            <el-menu
              :default-active="activeMenu"
              :router="false"
              :collapse="ThemeConfig.isCollapse"
              :collapse-transition="false"
              :unique-opened="true"
              :background-color="LAYOUT_CONFIG.sidebarColors.light.bg"
              :text-color="LAYOUT_CONFIG.sidebarColors.light.text"
            >
              <SubMenu :menuList="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="classic-main">
        <Main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SubMenu from "@/layouts/components/menu/SubMenu.vue";
import HeaderLeft from "../components/header/HeaderLeft.vue";
import HeaderRight from "../components/header/HeaderRight.vue";
import Main from "@/layouts/components/main/index.vue";
import { useLayoutState } from "../composables/useLayoutState";
import { useActiveMenu } from "../composables/useActiveMenu";
import { LAYOUT_CONFIG } from "../config";

const { ThemeConfig, menuList } = useLayoutState();
const activeMenu = useActiveMenu();
</script>

<style scoped lang="scss">
@use "./index";
</style>

<style lang="scss">
@use "../styles/menu-active" as menu;

.classic {
  .classic-content {
    height: calc(100% - 55px);
    .classic-main {
      display: flex;
      flex-direction: column;
    }
  }

  @include menu.menu-active-indicator;

  #driver-highlighted-element-stage {
    background-color: #606266 !important;
  }
}
</style>
