<template>
  <div class="cch-content">
    <Tabs />
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
</template>

<script setup lang="ts">
import Tabs from "./Tabs.vue";
</script>

<style scoped></style>
