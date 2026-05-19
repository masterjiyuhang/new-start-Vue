import { DEFAULT_PRIMARY } from "@/config";
import { ElMessage } from "element-plus";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { getLightColor, getDarkColor } from "@/utils/themeTool";
import { isClient } from "@/utils/is";

export const useTheme = () => {
  const { setThemeConfig } = useGlobalSettingStore();
  const { ThemeConfig } = storeToRefs(useGlobalSettingStore());

  const changePrimary = (val: string) => {
    if (!val) {
      val = DEFAULT_PRIMARY;
      ElMessage({
        type: "success",
        message: `主题颜色已重置为 ${DEFAULT_PRIMARY}`,
      });
    }
    setThemeConfig({ ...ThemeConfig.value, primary: val });

    if (!isClient) return;

    document.documentElement.style.setProperty(
      "--el-color-primary",
      ThemeConfig.value.primary
    );

    document.documentElement.style.setProperty(
      "--el-color-primary-dark-2",
      ThemeConfig.value.isDark
        ? (getLightColor(ThemeConfig.value.primary, 0.2) ?? "")
        : (getDarkColor(ThemeConfig.value.primary, 0.3) ?? "")
    );

    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        ThemeConfig.value.isDark
          ? (getDarkColor(ThemeConfig.value.primary, i / 10) ?? "")
          : (getLightColor(ThemeConfig.value.primary, i / 10) ?? "")
      );
    }
  };

  const switchDark = () => {
    if (!isClient) return;
    const html = document.documentElement;
    if (ThemeConfig.value.isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    changePrimary(ThemeConfig.value.primary);
  };

  const changeGreyOrWeak = (value: boolean, type: string) => {
    if (!isClient) return;
    const body = document.body;
    if (!value) {
      body.style.filter = "";
      return;
    }
    if (type === "grey") body.style.filter = "grayscale(1)";
    if (type === "weak") body.style.filter = "invert(80%)";
    const propName = type === "grey" ? "isWeak" : "isGrey";
    setThemeConfig({ ...ThemeConfig.value, [propName]: false });
  };

  const initTheme = () => {
    switchDark();
    if (ThemeConfig.value.isGrey) changeGreyOrWeak(true, "grey");
    if (ThemeConfig.value.isWeak) changeGreyOrWeak(true, "weak");
  };

  return {
    changePrimary,
    initTheme,
    switchDark,
    changeGreyOrWeak,
  };
};
