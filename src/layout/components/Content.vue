<template>
  <div>
    <Tabs />
    <Tab />
    <div class="cch-content">
      <div class="cch-content__wrapper">
        <router-view>
          <template #default="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </template>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "./Tabs/index.vue";
import Tab from "./Tabs/tabs.vue";
</script>

<style scoped lang="scss">
.cch-content {
  position: absolute;

  // top: 65px;
  inset: 125px 0 0 cch-variables.$side-bar-width;
  width: auto;
  min-width: 500px;
  padding: 20px;
  overflow: auto;
  transition: left cch-variables.$side-bar-animate;
}
</style>
