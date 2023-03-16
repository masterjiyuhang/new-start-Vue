<template>
  <div class="header-right">
    <div class="header-icon">
      <!-- 设置组件大小 -->
      <AssemblySize />

      <!-- 修改语言 -->
      <ChangeLanguage />

      <!-- 消息提示 -->
      <Message />

      <!-- 设置主题 -->
      <ThemeSetting />
    </div>
    <span class="username">erhang</span>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import AssemblySize from "./components/AssemblySize.vue";
import ChangeLanguage from "./components/ChangeLanguage.vue";
import Message from "./components/Message.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import Avatar from "./components/Avatar/index.vue";
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
