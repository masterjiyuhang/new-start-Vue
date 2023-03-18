import { DEFAULT_PRIMARY } from "@/config";
import { ElMessage } from "element-plus";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { getLightColor, getDarkColor } from "@/utils/themeTool";

export const useTheme = () => {
  const { setThemeConfig } = useGlobalSettingStore();
  const { ThemeConfig } = storeToRefs(useGlobalSettingStore());
  // 修改主题颜色
  const changePrimary = (val: string) => {
    if (!val) {
      val = DEFAULT_PRIMARY;
      ElMessage({
        type: "success",
        message: `主题颜色已重置为 ${DEFAULT_PRIMARY}`,
      });
    }
    console.log(ThemeConfig.value.primary, "主题颜色");
    setThemeConfig({ ...ThemeConfig.value, primary: val });

    console.log(ThemeConfig.value.primary, "主题颜色");

    document.documentElement.style.setProperty(
      "--el-color-primary",
      ThemeConfig.value.primary
    );

    document.documentElement.style.setProperty(
      "--el-color-primary-dark-2",
      ThemeConfig.value.isDark
        ? `${getLightColor(ThemeConfig.value.primary, 0.2)}`
        : `${getDarkColor(ThemeConfig.value.primary, 0.3)}`
    );
    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        ThemeConfig.value.isDark
          ? `${getDarkColor(ThemeConfig.value.primary, i / 10)}`
          : `${getLightColor(ThemeConfig.value.primary, i / 10)}`
      );
    }
  };

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement as HTMLElement;
    if (ThemeConfig.value.isDark) body.setAttribute("class", "dark");
    else body.setAttribute("class", "");
    changePrimary(ThemeConfig.value.primary);
  };

  // 灰色和弱色切换
  const changeGreyOrWeak = (value: boolean, type: string) => {
    const body = document.body as HTMLElement;
    if (!value) return body.setAttribute("style", "");
    if (type === "grey") body.setAttribute("style", "filter: grayscale(1)");
    if (type === "weak") body.setAttribute("style", "filter: invert(80%)");
    const propName = type == "grey" ? "isWeak" : "isGrey";
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
    changeGreyOrWeak
  };
};
