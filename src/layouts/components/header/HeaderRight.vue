<template>
  <div class="header-right">
    <div class="header-icon">
      <AssemblySize />

      <ChangeLanguage />
    </div>
    <span class="username">erhang</span>
  </div>
</template>

<script setup lang="ts">
import AssemblySize from "./components/AssemblySize.vue";
import ChangeLanguage from "./components/ChangeLanguage.vue";
</script>

<style lang="scss" scoped>
.header-right {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px 0 0;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
  }
}
</style>
