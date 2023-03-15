<template>
  <div>
    <template v-for="subItem in menuList" :key="subItem.path">
      <el-sub-menu
        v-if="subItem.children && subItem.children.length > 0"
        :index="subItem.path"
      >
        <template #title>
          <!-- <el-icon>
            <component :is="subItem.meta.icon"></component>
          </el-icon> -->
          <span>{{ subItem.meta.title }}</span>
        </template>
        <SubMenu :menuList="subItem.children" />
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="subItem.path"
        @click="handleClickMenu(subItem)"
      >
        <!-- <el-icon>
          <component :is="subItem.meta.icon"></component>
        </el-icon> -->
        <template #title>
          <span>{{ subItem.meta.icon }} {{ subItem.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";
import { useRouter } from "vue-router";

// defineComponent({
//   name: "AsyncIcon",
//   props: ["iconName"],
//   setup(props) {
//     const iconName = props.iconName;
//     return () => <>{iconName}</>;
//   },
// });

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>
