<template>
  <div>
    <Tabs />
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
import Tabs from "./Tabs/Tabs.vue";
</script>

<style scoped lang="scss">
.cch-content {
  position: absolute;
  width: auto;
  min-width: 500px;
  position: absolute;
  left: cch-variables.$side-bar-width;
  right: 0;
  top: 65px;
  bottom: 0;
  overflow: hidden;
  transition: left cch-variables.$side-bar-animate;
  padding: 20px;
}
</style>
