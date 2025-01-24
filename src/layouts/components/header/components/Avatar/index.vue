<template>
  <el-dropdown trigger="click">
    <div class="avatar">
      <img src="@/assets/system/HalloweenIllustrations4.png" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openDialog('infoRef')">
          <el-icon><User /></el-icon>个人中心
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          <el-icon><Edit /></el-icon>修改密码
        </el-dropdown-item>
        <el-dropdown-item @click="logout" divided>
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- infoDialog -->
  <InfoDialog ref="infoRef" />
  <!-- passwordDialog -->
  <PasswordDialog ref="passwordRef" />
</template>

<script setup lang="ts">
import { ElMessageBox, ElMessage } from "element-plus";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { useRouter } from "vue-router";
import { logoutApi } from "@/api/mock";
import { LOGIN_URL } from "@/config";
import { ref } from "vue";
import InfoDialog from "./components/InfoDialog.vue";
import PasswordDialog from "./components/PasswordDialog.vue";

// 代码定位hack方法
defineProps<{ codeLocation?: string }>();

const { setToken } = useGlobalSettingStore();
const router = useRouter();

// 退出登录
const logout = () => {
  ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    // 1.调用退出登录接口
    await logoutApi();
    // 2.清除 Token
    setToken("");
    // 3.重定向到登陆页
    router.replace(LOGIN_URL);
    ElMessage.success("退出登录成功！");
  });
};

interface DialogExpose {
  openDialog: () => void;
}

const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);

// 打开弹窗
const openDialog = (refName: string) => {
  if (refName == "infoRef") infoRef.value?.openDialog();
  else passwordRef.value?.openDialog();
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
