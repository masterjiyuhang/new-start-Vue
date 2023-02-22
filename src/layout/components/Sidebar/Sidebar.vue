<template>
  <div :class="[isCollapse ? 'cch-sidebar--collapse' : '']" class="cch-sidebar">
    <div v-if="!isCollapse" class="flex-c">
      <img src="@/assets/logo.png" width="65" />
    </div>
    <div>
      <Menu title="部门列表" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "./menu";
import { ref, provide } from "vue";

const isCollapse = ref(false);

provide("isCollapse", isCollapse.value);
</script>

<style lang="scss">
$select-bg: cch-variables.$nav-select-bg;

%icon {
  i.rc-sidebar-icon {
    color: cch-variables.$primary;
  }
}

%hidemenu {
  display: none;
}

@include cch.b(sidebar) {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1001;
  overflow: hidden;
  height: 100%;
  background-color: cch-variables.$nav-bg;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  width: cch-variables.$side-bar-width;
  transition: width cch-variables.$side-bar-animate ease-in;

  @include cch.m(collapse) {
    width: cch-variables.$side-bar-width-mini !important;

    .el-menu-item {
      span {
        @extend %hidemenu;
      }

      &.is-active {
        display: none;
      }
    }

    .el-submenu__title {
      span {
        @extend %hidemenu;
      }
    }

    .rc-sidebar__logo {
      transition: all cch-variables.$side-bar-animate;
    }
  }

  @include cch.e(logo) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    line-height: 64px;
    background: cch-variables.$primary;
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    overflow: hidden;

    .site-name {
      margin-left: 10px;

      @include cch.text-overflow-1;
    }
  }

  @include cch.e(menu) {
    padding-top: 16px;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu {
    background-color: cch-variables.$nav-bg;
    width: 100% !important;
    border: 0;
    transition: height cch-variables.$side-bar-animate ease-in;

    .el-menu-item,
    .el-submenu__title {
      color: #fff;
      font-size: 13px;
      transition: background-color cch-variables.$side-bar-animate linear;

      span {
        font-size: 14px;
      }

      &:hover,
      &:focus {
        outline: none;
        background-color: rgba($select-bg, 0.38);
      }

      // 选中状态
      @include cch.when(active) {
        background-color: $select-bg;
        color: cch-variables.$primary;
        position: relative;

        @extend %icon;

        &::after {
          content: "";
          height: 100%;
          width: 3px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: cch-variables.$primary;
        }
      }
    }
  }

  // 收起菜单时 弹出菜单
  @include cch.e(menu-popper) {
    .el-menu-item,
    .el-submenu__title {
      @include cch.when(active) {
        background-color: cch-variables.$select-hover-background;
        color: cch-variables.$primary;
      }
    }
  }
}
</style>
