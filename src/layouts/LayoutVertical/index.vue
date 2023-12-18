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
          <span v-show="!ThemeConfig.isCollapse">Vertical Admin</span>
        </div>
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :router="false"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
            background-color="#191a20"
            text-color="#bdbdc0"
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
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { AuthStore } from "@/stores/modules/auth";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import HeaderLeft from "../components/header/HeaderLeft.vue";
import HeaderRight from "../components/header/HeaderRight.vue";

const route = useRoute();
const activeMenu = computed(() =>
  route.meta.activeMenu ? route.meta.activeMenu : route.path
);
const { ThemeConfig } = storeToRefs(useGlobalSettingStore());

const isCollapse = computed(
  () => useGlobalSettingStore().ThemeConfig.isCollapse
);
const { showMenuListGet: menuList } = storeToRefs(AuthStore());
</script>

<style scoped lang="scss">
@import "./index";
</style>

<style lang="scss">
.vertical {
  .el-menu,
  .el-menu--popup {
    .el-menu-item {
      &.is-active {
        background: #060708;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          background: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
