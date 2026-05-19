<!-- 横向布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="logo flex-c">
        <img src="@/assets/logo.png" alt="logo" />
        <span>{{ LAYOUT_CONFIG.appName }}</span>
      </div>

      <el-menu
        mode="horizontal"
        :default-active="activeMenu"
        :router="false"
        :unique-opened="true"
        :background-color="LAYOUT_CONFIG.sidebarColors.dark.bg"
        :text-color="LAYOUT_CONFIG.sidebarColors.dark.text"
        active-text-color="#ffffff"
      >
        <template v-for="subItem in menuList" :key="subItem.path">
          <el-sub-menu
            v-if="subItem.children?.length"
            :index="subItem.path"
            :key="subItem.path + 'el-sub-menu'"
          >
            <template #title>
              <el-icon>
                <component :is="subItem.meta.icon" />
              </el-icon>
              <span>{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menuList="subItem.children" />
          </el-sub-menu>
          <el-menu-item
            v-else
            :index="subItem.path"
            :key="subItem.path + 'el-menu-item'"
            @click="handleClickMenu(subItem)"
          >
            <el-icon>
              <component :is="subItem.meta.icon" />
            </el-icon>
            <template #title>
              <span>{{ subItem.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>

      <HeaderRight />
    </el-header>
    <Main />
  </el-container>
</template>

<script setup lang="ts">
import Main from "@/layouts/components/main/index.vue";
import HeaderRight from "../components/header/HeaderRight.vue";
import SubMenu from "@/layouts/components/menu/SubMenu.vue";
import { useLayoutState } from "../composables/useLayoutState";
import { useActiveMenu } from "../composables/useActiveMenu";
import { useMenuClick } from "../composables/useMenuClick";
import { LAYOUT_CONFIG } from "../config";

const { menuList } = useLayoutState();
const activeMenu = useActiveMenu();
const { handleClickMenu } = useMenuClick();
</script>

<style scoped lang="scss">
@use "./index";
</style>

<style lang="scss">
@use "../styles/menu-active" as menu;

.transverse {
  .el-menu--horizontal {
    .el-menu-item,
    .el-sub-menu {
      height: 54px !important;

      .el-sub-menu__title {
        height: 100%;
      }
    }

    .el-sub-menu__hide-arrow {
      width: 54px !important;
    }
  }

  @include menu.menu-active-indicator(#060708);

  #driver-highlighted-element-stage {
    background-color: #606266 !important;
  }
}
</style>
