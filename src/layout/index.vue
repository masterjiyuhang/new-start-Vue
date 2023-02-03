<template>
  <section class="app-main">
    <RouterView v-slot="{ Component, route }">
      <el-scrollbar>
        <el-backtop title="回到顶部" target=".app-main">
          <el-icon><Top /></el-icon>
        </el-backtop>

        <transitionMain :route="route">
          <keep-alive v-if="keepAlive">
            <component
              :is="Component"
              :key="route.fullPath"
              class="main-content"
            />
          </keep-alive>
        </transitionMain>
      </el-scrollbar>
    </RouterView>
  </section>
</template>

<script setup lang="ts">
import { Top } from "@element-plus/icons-vue";
import { computed, defineComponent, h, Transition } from "vue";

const keepAlive = computed(() => {
  return true;
});

// const transitions = computed(() => {
//   return (route) => {
//     return route.meta.transition;
//   };
// });

const transitionMain = defineComponent({
  render() {
    const defaultComp = this.$slots.default ? this.$slots.default() : null;
    return h(
      Transition,
      {
        name: "fade",
        mode: "out-in",
        appear: true,
      },
      {
        default: () => [defaultComp],
      }
    );
  },
  props: {
    route: {
      type: undefined,
      required: true,
    },
  },
});
</script>

<style scoped></style>
