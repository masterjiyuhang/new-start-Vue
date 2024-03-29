<template>
  <div :class="['breadcrumb-box', !ThemeConfig.breadcrumbIcon && 'no-icon']">
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <div
            class="el-breadcrumb__inner is-link"
            @click="onBreadcrumbClick(item, index)"
          >
            <el-icon
              class="breadcrumb-icon"
              v-show="item.meta.icon && ThemeConfig.breadcrumbIcon"
            >
              <component :is="item.meta.icon" />
            </el-icon>
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { AuthStore } from "@/stores/modules/auth";
import { computed } from "vue";
import { HOME_URL } from "@/config";

const router = useRouter();
const route = useRoute();
const { ThemeConfig } = storeToRefs(useGlobalSettingStore());

const { breadcrumbListGet } = AuthStore();

const breadcrumbList = computed(() => {
  let res =
    breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
  // 🙅‍♀️不需要首页面包屑可删除以下判断
  if (res[0].meta.title !== route.meta.title) {
    res = [
      { path: HOME_URL, meta: { icon: "HomeFilled", title: "首页" } },
      ...res,
    ];
  }
  return res;
});

const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
  if (index !== breadcrumbList.value.length - 1) {
    router.push(item.path);
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb-box {
  display: flex;
  align-items: center;
  padding-right: 50px;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    #000 0%,
    #000 calc(100% - 50px),
    transparent
  );

  .el-breadcrumb {
    white-space: nowrap;

    .el-breadcrumb__item {
      display: inline-block;
      position: relative;
      float: none;

      .el-breadcrumb__inner {
        display: inline-flex;

        .breadcrumb-icon {
          margin-top: 2px;
          margin-right: 6px;
          font-size: 16px;
        }

        .breadcrumb-title {
          margin-top: 3px;
        }
      }

      :deep(.el-breadcrumb__separator) {
        position: relative;
        top: -1px;
      }
    }
  }
}

.no-icon {
  .el-breadcrumb {
    .el-breadcrumb__item {
      top: -2px;

      :deep(.el-breadcrumb__separator) {
        top: 2px;
      }
    }
  }
}
</style>
