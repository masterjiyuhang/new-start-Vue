import { DEFAULT_PRIMARY } from "@/config";
import { ElMessage } from "element-plus";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";

export const useTheme = () => {
  const { setThemeConfig } = useGlobalSettingStore();
  // 修改主题颜色
  const changePrimary = (val: string) => {
    if (!val) {
      val = DEFAULT_PRIMARY;
      ElMessage({
        type: "success",
        message: `主题颜色已重置为 ${DEFAULT_PRIMARY}`,
      });
    }
  };

  return {
    changePrimary,
  };
};
