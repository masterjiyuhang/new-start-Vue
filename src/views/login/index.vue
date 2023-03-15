<template>
  <div class="cch-login-page">
    login page

    <el-button type="primary" @click="login">Login button</el-button>
  </div>
</template>

<script setup lang="ts">
import { loginApi } from "@/api/auth";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { useTabsStore } from "@/stores/modules/tabs";
import { initDynamicRouter } from "@/router/dynamicRouter";
import { HOME_URL } from "@/config";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { getTimeState } from "@/utils";

const { setToken, setKeepAliveName, token, someState } =
  useGlobalSettingStore();
const { closeMultipleTab } = useTabsStore();
const router = useRouter();

const login = async () => {
  console.log(someState, "11111111", token);
  // 1.执行登录接口
  const { data } = await loginApi();
  setToken(data.access_token);
  console.log("login 登录", data, token);

  // 2.添加动态路由
  await initDynamicRouter();

  // 3.清空 tabs、keepAlive 保留的数据
  closeMultipleTab();
  setKeepAliveName();

  // 4.跳转到首页
  router.push(HOME_URL);
  ElNotification({
    title: getTimeState(),
    message: "欢迎登录 Cch-Admin",
    type: "success",
    duration: 3000,
  });
};
</script>

<style lang="scss" scoped>
.cch-login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
