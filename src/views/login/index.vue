<template>
  <div class="cch-login-page">
    <div class="login-box flex-ac w-[96%] h-[94%]">
      <!-- <SwitchDark class="dark" /> -->
      <div class="dark flex-c">
        <!-- 切换模式 -->
        <el-switch
          v-model="globalStore.ThemeConfig.isDark"
          @change="switchDark"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
        />
        <!-- 切换语言 -->
        <ChangeLanguage class="ml-2 mr-2" />
      </div>
      <div class="login-left">
        <img src="@/assets/system/HalloweenIllustrations1.png" alt="login" />
      </div>

      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/logo.png" alt="" />
          <h2 class="logo-text">
            <!-- 打印效果展示系统名称 -->
            <CchTypeCode :values="[systemTile]" :cursor="false" :speed="150" />
          </h2>
        </div>
        <el-form
          :rules="loginFormRules"
          :model="ruleForm"
          ref="ruleFormRef"
          size="large"
        >
          <el-form-item prop="userName">
            <el-input
              clearable
              v-model="ruleForm.userName"
              :placeholder="$t('login.enterUsername')"
              :prefix-icon="renderIcon_v2('User')"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              clearable
              v-model="ruleForm.password"
              :placeholder="$t('login.enterPassword')"
              :prefix-icon="renderIcon_v2('Lock')"
            />
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input
              clearable
              v-model="ruleForm.verifyCode"
              :placeholder="$t('login.enterCode')"
              :prefix-icon="renderIcon_v2('Star')"
            >
              <!-- <template #prepend>Http://</template> -->
              <template #append>
                <GenerateImageCode
                  v-model:code="imgCode"
                  ref="GenerateImageCodeRef"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="login-btn-box">
            <div class="w-full h-[20px] flex-bc">
              <el-checkbox v-model="checked">
                {{ $t("login.rememberPassword") }}
              </el-checkbox>
              <el-button link type="primary">
                {{ $t("login.forgetPassword") }}
              </el-button>
            </div>
            <el-button
              class="mt-4 login-btn"
              type="primary"
              @click="handleLogin(ruleFormRef)"
              >{{ $t("login.loginBtn") }}</el-button
            >
          </el-form-item>

          <!-- 登录方式选择 -->
          <el-form-item>
            <div class="w-full h-[20px] flex justify-between items-center">
              <el-button
                v-for="(item, index) in loginState.operates"
                :key="index"
                class="mt-4 form-btn"
                size="default"
              >
                {{ $t(item.title) }}
              </el-button>
            </div>
          </el-form-item>

          <el-form-item>
            <el-divider>
              <p class="text-xs text-gray-500">{{ $t("login.thirdLogin") }}</p>
            </el-divider>
            <div class="flex w-full justify-evenly">
              <span
                class="cursor-pointer"
                v-for="(item, index) in loginState.thirdParty"
                :key="index"
                :title="$t(item.title)"
              >
                <renderIcon :name="item.icon" />
                <el-icon>
                  <component :is="renderIcon_v3(item.icon)" />
                </el-icon>
              </span>
            </div>
          </el-form-item>
        </el-form>
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
import type { FormInstance, FormRules } from "element-plus";
import { getTimeState } from "@/utils/system";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";
import { onMounted, reactive, ref, watch } from "vue";

import { REGEXP_PWD } from "./utils/rule";

import { useRenderElementIcon } from "@/hooks/useRenderElementIcon";
import GenerateImageCode from "@/components/GenerateImageCode/src/index";
import { useI18n } from "vue-i18n";

import renderIcon from "./components/renderIcon.vue";
import ChangeLanguage from "@/layouts/components/header/components/ChangeLanguage.vue";
import { useEventListener } from "@vueuse/core";

// 系统名称
const systemTile = import.meta.env.VITE_GLOB_APP_TITLE;
const { switchDark } = useTheme();
const { setToken, setUserId, setKeepAliveName, changeLanguage } =
  useGlobalSettingStore();
const { closeMultipleTab } = useTabsStore();
const globalStore = useGlobalSettingStore();
const router = useRouter();
const i18n = useI18n();

const { renderIcon_v2, renderIcon_v3 } = useRenderElementIcon();

const ruleFormRef = ref<FormInstance>();
// 验证码组件
const GenerateImageCodeRef = ref();
// 表单对象
const ruleForm = reactive<LoginFormData>({
  userName: "cchzuishuai",
  password: "cch123456",
  verifyCode: "",
});

const loginState = reactive({
  verifyCode: "",
  operates: [
    {
      title: "login.phoneLogin",
    },
    {
      title: "login.qRCodeLogin",
    },
    {
      title: "login.register",
    },
  ],
  thirdParty: [
    {
      title: "login.weChatLogin",
      icon: "Star",
    },
    {
      title: "login.alipayLogin",
      icon: "Bell",
    },
    {
      title: "login.qqLogin",
      icon: "Aim",
    },
    {
      title: "login.weiboLogin",
      icon: "House",
    },
  ],
});

// 表单校验规则
const loginFormRules = reactive<FormRules>({
  userName: [
    { required: true, message: i18n.t("login.enterUsername"), trigger: "blur" },
  ],
  password: [
    {
      validator: (_rule, value, callback) => {
        if (value === "") {
          callback(new Error(i18n.t("login.enterPassword")));
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error(i18n.t("login.passwordVerify")));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  verifyCode: [
    {
      validator: (_rule, value, callback) => {
        if (value === "") {
          callback(new Error(i18n.t("login.enterCode")));
        } else if (loginState.verifyCode !== value) {
          console.log(GenerateImageCodeRef.value.re);
          GenerateImageCodeRef.value.re();
          callback(new Error(i18n.t("login.verifyCode")));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

// 记住密码
const checked = ref<boolean>(false);

// 图片验证码
const imgCode = ref<string>("");

// 登录事件
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 1.执行登录接口
      const { data } = await loginApi();
      setToken(data.access_token);
      setUserId(data.user_id);

      // 2.添加动态路由
      await initDynamicRouter();

      // 3.清空 tabs、keepAlive 保留的数据
      closeMultipleTab();
      setKeepAliveName();

      // 4.跳转到首页
      router.push(HOME_URL);
      ElNotification({
        title: getTimeState(),
        message: `${i18n.t("login.welcome")} ${systemTile}"`,
        type: "success",
        duration: 3000,
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

function initLoginForm() {
  onMounted(() => {
    i18n.locale.value = globalStore.language;
    changeLanguage(globalStore.language);
  });
  // 给验证码赋值
  watch(imgCode, (newVal) => {
    loginState.verifyCode = newVal;
  });
}

function initHandlePress() {
  const handlePress = (e: KeyboardEvent) => {
    e.key === "Enter" && handleLogin(ruleFormRef.value);
  };
  useEventListener(document, "keydown", handlePress);
}

initLoginForm();
initHandlePress();
</script>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.cch-login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 550px;
  background-color: #eee;
  background-image: url("@/assets/images/login_bg.svg");
  background-size: 100% 100%;
  background-size: cover;

  .login-box {
    position: relative;
    box-sizing: border-box;
    padding: 0 50px;
    border-radius: 10px;
    background-color: hsl(0deg 0% 100% / 80%);

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
      position: relative;
      width: 450px;
      padding: 50px 40px 25px;
      transition: 0.5s;
      border-radius: 66% 48% 33% 67% / 22% 95% 55% 62%;
      background-color: #fff;
      box-shadow:
        inset 20px 20px 20px rgb(0 0 0 / 5%),
        25px 35px 20px rgb(0 0 0 / 5%),
        25px 30px 30px rgb(0 0 0 / 5%),
        inset -20px -20px 25px rgb(255 255 255 / 90%);

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
          margin: 0;
          padding: 0 0 0 25px;
          color: #34495e;
          font-size: 42px;
          font-weight: bold;
          white-space: nowrap;
        }
      }

      .el-form-item {
        margin-bottom: 20px;
      }

      .login-btn {
        display: flex;
        justify-content: center;
        width: 80%;
        margin: 40px auto 0;
        transition: 0.6s;
        white-space: nowrap;

        &:hover {
          width: 100%;
        }
      }

      .form-btn {
        width: 33%;
        overflow: hidden;
        color: #fee;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :deep(.el-button > span) {
        display: inline-block;
        align-items: center;
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      // .login-btn-box {
      //   background-color: #f80;
      // }
    }

    .login-form:hover {
      border-radius: 33% 24% 33% 67% / 11% 89% 55% 62%;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50px;
      left: 85px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      opacity: 0.9;
      background-color: #f00;
    }

    &::after {
      content: "";
      position: absolute;
      top: 90px;
      left: 110px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      opacity: 0.9;
      background-color: #f80;
    }
  }
}

@media screen and (width <= 1250px) {
  .login-left {
    display: none;
  }

  .login-form {
    .form-btn {
      width: 33%;
      overflow: hidden;
      color: #fee;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :deep(.el-button > span) {
      display: inline-block;
      align-items: center;
      overflow: hidden;
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

@media screen and (width <= 600px) {
  .login-form {
    width: 97% !important;

    .form-btn {
      width: 33%;
      overflow: hidden;
      color: #f80;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :deep(.el-button > span) {
      display: inline-block;
      align-items: center;
      overflow: hidden;
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
