<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="cch-aside">
        <Aside />
      </el-aside>
      <el-container>
        <el-header class="!p-[0px] !h-[120px] bg-slate-500">
          <Header />
          <Tabs />
        </el-header>

        <el-main><RouterView /></el-main>
        <el-footer class="!p-[0px]"><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "./components/Aside.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Tabs from "./components/Tabs/index.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;

  .cch-aside {
    background-color: #eee;
  }
}
</style>
