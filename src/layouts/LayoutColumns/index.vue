<!-- 分栏布局 -->
<template>
  <el-container class="layout">
    <div class="aside-split">
      <div class="logo flex-c">
        <img src="@/assets/logo.png" alt="logo" />
      </div>

      <el-scrollbar>
        <div class="split-list">
          <div
            class="split-item"
            :class="{
              'split-active':
                splitActive === item.path ||
                `/${splitActive.split('/')[1]}` === item.path,
            }"
            v-for="item in menuList"
            :key="item.path"
            @click="changeSubMenu(item)"
          >
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span class="title">{{ item.meta.title }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <el-aside
      :class="{ 'not-aside': !subMenu.length }"
      :style="{ width: ThemeConfig.isCollapse ? '65px' : '210px' }"
    >
      <div class="logo flx-center">
        <span v-show="subMenu.length">
          {{ ThemeConfig.isCollapse ? "C" : "Cch Admin" }}
        </span>
      </div>
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          :router="false"
          :collapse="ThemeConfig.isCollapse"
          :collapse-transition="false"
          :unique-opened="true"
          background-color="#ffffff"
        >
          <SubMenu :menuList="subMenu" />
        </el-menu>
      </el-scrollbar>
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
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { AuthStore } from "@/stores/modules/auth";
import { storeToRefs } from "pinia";

import SubMenu from "@/layouts/components/menu/SubMenu.vue";
import HeaderLeft from "../components/header/HeaderLeft.vue";
import HeaderRight from "../components/header/HeaderRight.vue";
import Main from "@/layouts/components/main/index.vue";

const route = useRoute();
const router = useRouter();

const authStore = AuthStore();
const { ThemeConfig } = storeToRefs(useGlobalSettingStore());

const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() =>
  route.meta.activeMenu ? route.meta.activeMenu : route.path
);
const splitActive = ref<string>("");
const subMenu = ref<Menu.MenuOptions[]>([]);

watch(
  () => [menuList, route],
  () => {
    // 当前菜单没有数据直接 return
    if (!menuList.value.length) return;
    splitActive.value = route.path;
    const menuItem = menuList.value.filter(
      (item: Menu.MenuOptions) =>
        route.path === item.path || `/${route.path.split("/")[1]}` === item.path
    );
    if (menuItem[0].children?.length)
      return (subMenu.value = menuItem[0].children);
    subMenu.value = [];
  },
  {
    deep: true,
    immediate: true,
  }
);

// 切换 SubMenu
const changeSubMenu = (item: Menu.MenuOptions) => {
  splitActive.value = item.path;
  if (item.children?.length) return (subMenu.value = item.children);
  subMenu.value = [];
  router.push(item.path);
};
</script>

<style scoped lang="scss">
@import "./index";
</style>

<style lang="scss">
.columns {
  .el-menu,
  .el-menu--popup {
    .el-menu-item {
      &.is-active {
        background: var(--el-color-primary-light-9);

        &::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 4px;
          background: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
