<template>
  <div :class="[isCollapse ? 'cch-sidebar--collapse' : '']" class="cch-sidebar">
    <div class="flex-c">
      <img src="@/assets/logo.png" :width="logoWidth" />
    </div>
    <div>
      <Menu title="列表" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "./menu";
import { ref, provide, computed, reactive, watch } from "vue";
import { moduleRouteList } from "@/router/basic";
// import { emitter } from "@/utils/mitt";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";

const { isCollapse } = storeToRefs(useGlobalSettingStore());
const logoWidth = ref(65);

const sidebarState = reactive({
  menuList: [],
});

// 先按照weight排个序
const r1 = moduleRouteList
  .reduce((pre, next) => {
    // console.log(pre, next);
    return pre.concat(next);
  }, [])
  .sort((A: any, B: any) => {
    const weightA = A.meta.weight;
    const weightB = B.meta.weight;
    return weightB - weightA;
  });

sidebarState.menuList = r1.map((item: any) => {
  if (item.children) {
    // 孩子节点
    item.children.map((childMenu: any) => {
      childMenu.url = `${item.path}/${childMenu.path}`;
      // 孙子节点
      if (childMenu.children) {
        childMenu.children = childMenu.children.map((grandsonMenu: any) => {
          grandsonMenu.url = `${item.path}/${childMenu.path}/${grandsonMenu.path}`;
          return grandsonMenu;
        });
      }
      return childMenu;
    });
  }
  item.url = item.path;
  return item;
});

provide(
  "isCollapse",
  computed(() => {
    return isCollapse.value;
  })
);
provide(
  "menuList",
  computed(() => sidebarState.menuList)
);

watch(
  () => isCollapse.value,
  (newVal) => {
    logoWidth.value = newVal ? 30 : 65;
  }
);
</script>

<style lang="scss">
$select-bg: cch-variables.$nav-select-bg;

@include cch.b(sidebar) {

  @include cch.m(collapse) {
    width: cch-variables.$side-bar-width-mini !important;

    .el-menu-item {
      span {
        @extend %hidemenu;
      }

      // &.is-active {
      //   display: none;
      // }
    }

    .el-sub-menu__title {
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
    align-items: center;
    justify-content: center;
    height: 64px;
    overflow: hidden;
    background: cch-variables.$primary;
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: 64px;
    text-align: center;

    .site-name {

      @include cch.text-overflow-1;

      margin-left: 10px;
    }
  }

  @include cch.e(menu) {
    padding-top: 16px;
  }

  // 收起菜单时 弹出菜单
  @include cch.e(menu-popper) {
    .el-menu-item,
    .el-sub-menu__title {
      @include cch.when(active) {
        background-color: cch-variables.$select-hover-background;
        color: cch-variables.$primary;
      }
    }
  }

  position: fixed;
  z-index: 1001;
  top: 0;
  bottom: 0;
  left: 0;
  width: cch-variables.$side-bar-width;
  height: 100%;
  overflow: hidden;
  transition: width cch-variables.$side-bar-animate ease-in;
  background-color: cch-variables.$nav-bg;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);

  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu {
    width: 100% !important;
    transition: height cch-variables.$side-bar-animate ease-in;
    border: 0;
    background-color: cch-variables.$nav-bg;

    .el-menu-item,
    .el-sub-menu__title {
      // 选中状态
      @include cch.when(active) {

        @extend %icon;

        position: relative;
        background-color: $select-bg;
        color: cch-variables.$primary;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: cch-variables.$primary;
        }
      }

      transition: background-color cch-variables.$side-bar-animate linear;
      color: #fff;
      font-size: 13px;

      span {
        font-size: 14px;
      }

      &:hover,
      &:focus {
        outline: none;
        background-color: rgba($select-bg, 0.38);
      }
    }
  }
}

%icon {
  i.rc-sidebar-icon {
    color: cch-variables.$primary;
  }
}

%hidemenu {
  display: none;
}
</style>
