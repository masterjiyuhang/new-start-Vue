<template>
  <div class="cch-login-page">
    <div class="login-box flex-ac w-[96%] h-[94%]">
      <!-- <SwitchDark class="dark" /> -->
      <div class="dark flex-c">
        <!-- 切换模式 -->
        <el-switch
          v-model="ThemeConfig.isDark"
          @change="switchDark"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
        />
        <!-- 切换语言 -->
        <ChangeLanguage class="ml-2" />
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
              :placeholder="'请输入账号'"
              :prefix-icon="renderIcon_v2('User')"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              clearable
              v-model="ruleForm.password"
              :placeholder="'请输入密码'"
              :prefix-icon="renderIcon_v2('Lock')"
            />
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input
              clearable
              v-model="ruleForm.verifyCode"
              :placeholder="'请输入验证码'"
              :prefix-icon="renderIcon_v2('Star')"
            >
              <!-- <template #prepend>Http://</template> -->
              <template #append>
                <GenerateImageCode v-model:code="imgCode" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="login-btn-box">
            <div class="w-full h-[20px] flex-bc">
              <el-checkbox v-model="checked"> 记住密码 </el-checkbox>
              <el-button link type="primary"> 忘记密码? </el-button>
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
import { storeToRefs } from "pinia";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";
import { onMounted, reactive, ref, watch } from "vue";

import { REGEXP_PWD } from "./utils/rule";

import { useRenderElementIcon } from "@/hooks/useRenderElementIcon";
import GenerateImageCode from "@/components/GenerateImageCode/src/index";
import { useI18n } from "vue-i18n";

import renderIcon from "./components/renderIcon.vue";
import ChangeLanguage from "@/layouts/components/header/components/ChangeLanguage.vue";

// 系统名称
const systemTile = import.meta.env.VITE_GLOB_APP_TITLE;
const { switchDark } = useTheme();
const { setToken, setKeepAliveName, token, changeLanguage } =
  useGlobalSettingStore();
const { closeMultipleTab } = useTabsStore();
const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
const router = useRouter();
const { language } = storeToRefs(useGlobalSettingStore());
const i18n = useI18n();

const { renderIcon_v2, renderIcon_v3 } = useRenderElementIcon();

const ruleFormRef = ref<FormInstance>();
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

// 图片验证码
const imgCode = ref<string>("");

// 表单校验规则
const loginFormRules = reactive<FormRules>({
  userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [
    {
      validator: (_rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!REGEXP_PWD.test(value)) {
          callback(
            new Error("密码格式应为8-18位数字、字母、符号的任意两种组合")
          );
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
          callback(new Error("请输入验证码"));
        } else if (loginState.verifyCode !== value) {
          callback(new Error("请输入正确的验证码"));
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

// 登录事件
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!");
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
    } else {
      console.log("error submit!", fields);
    }
  });
  // console.log(someState, "11111111", token);
};

// 给验证码赋值
watch(imgCode, (newVal) => {
  loginState.verifyCode = newVal;
});

onMounted(() => {
  i18n.locale.value = language.value;
  changeLanguage(language.value);
});
</script>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

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
      width: 450px;
      padding: 50px 40px 25px;
      background-color: #ffffff;
      box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
        25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
        inset -20px -20px 25px rgba(255, 255, 255, 0.9);
      transition: 0.5s;
      border-radius: 66% 48% 33% 67% / 22% 95% 55% 62%;
      position: relative;

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
        margin-bottom: 20px;
      }
      .login-btn {
        display: flex;
        justify-content: center;
        width: 80%;
        margin: 40px auto 0;
        white-space: nowrap;
        transition: 0.6s;

        &:hover {
          width: 100%;
        }
      }

      .form-btn {
        width: 33%;
        color: #fee;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      :deep(.el-button > span) {
        display: inline-block;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.5;
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
      background-color: #f00;
      opacity: 0.9;
    }

    &::after {
      content: "";
      position: absolute;
      top: 90px;
      left: 110px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #f80;
      opacity: 0.9;
    }
  }
}

@media screen and (max-width: 1250px) {
  .login-left {
    display: none;
  }

  .login-form {
    .form-btn {
      width: 33%;
      color: #fee;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :deep(.el-button > span) {
      display: inline-block;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.5;
    }
  }
}

@media screen and (max-width: 600px) {
  .login-form {
    width: 97% !important;
    .form-btn {
      width: 33%;
      color: #f80;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :deep(.el-button > span) {
      display: inline-block;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.5;
    }
  }
}
</style>
