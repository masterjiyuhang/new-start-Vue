<!-- 横向布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="logo flex-c">
        <img src="@/assets/logo.png" alt="logo" />
        <span>Trans Admin</span>
      </div>

      <el-menu
        mode="horizontal"
        :default-active="activeMenu"
        :router="false"
        :unique-opened="true"
        background-color="#191a20"
        text-color="#dadada"
        active-text-color="#ffffff"
      >
        <!-- 只有在这里写 submenu 才能触发 menu 三个点省略 -->
        <template v-for="subItem in menuList" :key="subItem.path">
          <el-sub-menu
            v-if="subItem.children?.length"
            :index="subItem.path"
            :key="subItem.path + 'el-sub-menu'"
          >
            <template #title>
              <el-icon>
                <component :is="subItem.meta.icon"></component>
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
              <component :is="subItem.meta.icon"></component>
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

import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { AuthStore } from "@/stores/modules/auth";

const route = useRoute();
const router = useRouter();
const authStore = AuthStore();
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() =>
  route.meta.activeMenu ? route.meta.activeMenu : route.path
);

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
.transverse {
  // 横向菜单布局
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
  .el-menu,
  .el-menu--popup {
    .el-menu-item {
      &.is-active {
        color: #ffffff;
        background: #060708;
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
