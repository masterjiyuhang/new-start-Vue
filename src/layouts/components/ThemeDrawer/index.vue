<template>
  <el-drawer
    v-model="drawer"
    title="布局设置"
    :direction="direction"
    :before-close="handleClose"
  >
    <!-- 布局切换 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Notification /></el-icon>
      布局切换
    </el-divider>
    <div class="layout-box">
      <el-tooltip
        effect="dark"
        content="纵向"
        placement="top"
        :show-after="200"
      >
        <div
          :class="[
            'layout-item layout-vertical',
            ThemeConfig.layout == 'vertical' ? 'is-active' : '',
          ]"
          @click="changeLayout('vertical')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="ThemeConfig.layout == 'vertical'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>

      <el-tooltip
        effect="dark"
        content="经典"
        placement="top"
        :show-after="200"
      >
        <div
          :class="[
            'layout-item layout-classic',
            ThemeConfig.layout == 'classic' ? 'is-active' : '',
          ]"
          @click="changeLayout('classic')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="ThemeConfig.layout == 'classic'"
            ><CircleCheckFilled
          /></el-icon>
        </div>
      </el-tooltip>

      <el-tooltip
        effect="dark"
        content="横向"
        placement="top"
        :show-after="200"
      >
        <div
          :class="[
            'layout-item layout-transverse',
            ThemeConfig.layout == 'transverse' ? 'is-active' : '',
          ]"
          @click="changeLayout('transverse')"
        >
          <div class="layout-dark"></div>
          <div class="layout-content"></div>
          <el-icon v-if="ThemeConfig.layout == 'transverse'"
            ><CircleCheckFilled
          /></el-icon>
        </div>
      </el-tooltip>

      <el-tooltip
        effect="dark"
        content="分栏"
        placement="top"
        :show-after="200"
      >
        <div
          :class="[
            'layout-item layout-columns',
            ThemeConfig.layout == 'columns' ? 'is-active' : '',
          ]"
          @click="changeLayout('columns')"
        >
          <div class="layout-dark"></div>
          <div class="layout-light"></div>
          <div class="layout-content"></div>
          <el-icon v-if="ThemeConfig.layout == 'columns'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
    </div>

    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker
        v-model="ThemeConfig.primary"
        :predefine="colorList"
        @change="changePrimary"
      />
    </div>

    <div class="theme-item">
      <span>暗黑模式</span>
      <el-switch
        v-model="ThemeConfig.isDark"
        @change="switchDark"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
      />
    </div>

    <div class="theme-item">
      <span>灰色模式</span>
      <el-switch
        v-model="ThemeConfig.isGrey"
        @change="changeGreyOrWeak($event, 'grey')"
      />
    </div>
    <div class="theme-item">
      <span>色弱模式</span>
      <el-switch
        v-model="ThemeConfig.isWeak"
        @change="changeGreyOrWeak($event, 'weak')"
      />
    </div>

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
    <div class="theme-item">
      <span>折叠菜单</span>
      <el-switch v-model="ThemeConfig.isCollapse" />
    </div>
    <div class="theme-item">
      <span>面包屑</span>
      <el-switch v-model="ThemeConfig.breadcrumb" />
    </div>
    <div class="theme-item">
      <span>标签栏</span>
      <el-switch v-model="ThemeConfig.tabs" />
    </div>
    <div class="theme-item">
      <span>页脚</span>
      <el-switch v-model="ThemeConfig.footer" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import { emitter } from "@/utils/mitt";
import { DEFAULT_PRIMARY } from "@/config";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { useTheme } from "@/hooks/useTheme";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { LayoutType } from "@/stores/interface";

const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
const drawer = ref(false);
const { setThemeConfig } = useGlobalSettingStore();

const { changePrimary, switchDark, changeGreyOrWeak } = useTheme();

// rtl / ltr / ttb / btt
const direction = ref("rtl");
const handleClose = () => {
  // console.log("关闭抽屉前的回调");
  drawer.value = false;
};

// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  "#DAA96E",
  "#0C819F",
  "#409EFF",
  "#27ae60",
  "#ff5c93",
  "#e74c3c",
  "#fd726d",
  "#f39c12",
  "#9b59b6",
];

onBeforeMount(() => {
  emitter.on("openThemeDrawer", () => {
    // console.log("监听抽屉打开");
    drawer.value = true;
  });
});

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => ThemeConfig.value.layout,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute("class", ThemeConfig.value.layout);
  },
  { immediate: true },
);

// 切换布局方式
const changeLayout = (val: LayoutType) => {
  setThemeConfig({ ...ThemeConfig.value, layout: val });
};
</script>

<style lang="scss" scoped>
@use "./index";
</style>
