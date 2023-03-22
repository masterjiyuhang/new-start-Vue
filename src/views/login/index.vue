<template>
  <div class="cch-login-page">
    <div class="login-box flex-ac w-[96%] h-[94%]">
      <!-- <SwitchDark class="dark" /> -->
      <el-switch
        v-model="ThemeConfig.isDark"
        @change="switchDark"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
        class="dark"
      />
      <div class="login-left">
        <img src="@/assets/system/HalloweenIllustrations1.png" alt="login" />
      </div>

      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/logo.png" alt="" />
          <h2 class="logo-text">Cch-Admin</h2>
        </div>
        <el-button type="primary" @click="login">Login button</el-button>
      </div>

    </div>
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
import { storeToRefs } from "pinia";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";

const { switchDark } = useTheme();

const { setToken, setKeepAliveName, token, someState } =
  useGlobalSettingStore();

const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
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
  min-height: 550px;
  background-color: #eeeeee;
  background-image: url("@/assets/images/login_bg.svg");
  background-size: 100% 100%;
  background-size: cover;

  .login-box {
    position: relative;
    box-sizing: border-box;
    padding: 0 50px;
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;
    .dark {
      position: absolute;
      top: 13px;
      right: 18px;
    }
    .login-left {
      width: 800px;
      margin: 0 10px 0 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      width: 420px;
      padding: 50px 40px 45px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);

      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;
        .login-icon {
          width: 60px;
          height: 52px;
        }
        .logo-text {
          padding: 0 0 0 25px;
          margin: 0;
          font-size: 42px;
          font-weight: bold;
          color: #34495e;
          white-space: nowrap;
        }
      }
      .el-form-item {
        margin-bottom: 40px;
      }
      .login-btn {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 40px;
        white-space: nowrap;
        .el-button {
          width: 185px;
        }
      }
    }
  }
}

@media screen and (max-width: 1250px) {
	.login-left {
		display: none;
	}
}

@media screen and (max-width: 600px) {
	.login-form {
		width: 97% !important;
	}
}
</style>
