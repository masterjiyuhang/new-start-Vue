<template>
  <el-container>
    <el-aside width="200px" class="bg-neutral-800">Aside</el-aside>
    <el-container class="min-w-full min-h-screen">
      <el-header class="bg-red-500">Header</el-header>
      <el-main class="bg-green-300">
        <RouterView>
          <template #default="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </template>
        </RouterView>
      </el-main>
      <el-footer class="bg-yellow-300">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped></style>
