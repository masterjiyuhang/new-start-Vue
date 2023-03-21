<template>
  <el-container class="layout">
    <el-header>
      <div class="header-lf">
        <div class="logo flex-c">
          <img src="@/assets/logo.png" alt="logo" />
          <span>HHHHH Admin</span>
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
              background-color="#ffffff"
              text-color="#303133"
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
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { AuthStore } from "@/stores/modules/auth";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed } from "vue";
import SubMenu from "@/layouts/components/menu/SubMenu.vue";
import HeaderLeft from "../components/header/HeaderLeft.vue";
import HeaderRight from "../components/header/HeaderRight.vue";
import Main from "@/layouts/components/main/index.vue";

const route = useRoute();
const authStore = AuthStore();
const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() =>
  route.meta.activeMenu ? route.meta.activeMenu : route.path
);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
.classic {
  .classic-content {
    height: calc(100% - 55px); // 减去头部高度
    .classic-main {
      display: flex;
      flex-direction: column;
    }
  }
  .el-menu,
  .el-menu--popup {
    .el-menu-item {
      &.is-active {
        background: var(--el-color-primary-light-9);
        &::before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          content: "";
          background: var(--el-color-primary);
        }
      }
    }
  }

  // guide
  #driver-highlighted-element-stage {
    background-color: #606266 !important;
  }
}
</style>
