import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { DefineComponent } from "vue";

export function useRenderElementIcon() {
  const renderIcon = (icon: string) => {
    if (!icon) {
      return null;
    }
    const IconComp = (
      ElementPlusIconsVue as { [key: string]: DefineComponent }
    )[icon];

    return (
      <el-icon>
        <IconComp />
      </el-icon>
    );
  };
  return {
    renderIcon,
  };
}
