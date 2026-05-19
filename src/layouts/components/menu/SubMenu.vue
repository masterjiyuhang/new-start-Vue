<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu
      v-if="subItem.children && subItem.children.length > 0"
      :index="subItem.path"
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
      @click="handleClickMenu(subItem)"
    >
      <el-icon>
        <component :is="subItem.meta.icon" />
      </el-icon>
      <template #title>
        <span> {{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useMenuClick } from "../../composables/useMenuClick";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const { handleClickMenu } = useMenuClick();
</script>
