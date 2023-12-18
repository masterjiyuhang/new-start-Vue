import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { Component, DefineComponent, defineComponent, h } from "vue";

export interface iconType {
  // iconify (https://docs.iconify.design/icon-components/vue/#properties)
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  flip?: string;
  rotate?: number | string;
  color?: string;
  horizontalAlign?: boolean;
  verticalAlign?: boolean;
  align?: string;
  onLoad?: Function;
  includes?: Function;

  //  all icon
  style?: object;
}

export function useRenderElementIcon() {
  /**
   * 渲染Element的Icon
   * @param icon
   * @returns
   */
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

  const renderIcon_v2 = (icon: any, attrs?: iconType): Component => {
    const IconComp = (
      ElementPlusIconsVue as { [key: string]: DefineComponent }
    )[icon];

    // console.log(IconComp, "v2........");
    return defineComponent({
      name: "SelfIcon",
      render() {
        return h(
          "span",
          {
            class: "cch-self-icon",
            ...attrs,
          },
          {
            default: () => [h(IconComp)],
          }
        );
      },
    });
  };

  const renderIcon_v3 = (icon): Component => {
    const IconComp = (
      ElementPlusIconsVue as { [key: string]: DefineComponent }
    )[icon];

    console.log(IconComp);
    return IconComp;
  };
  return {
    renderIcon,
    renderIcon_v2,
    renderIcon_v3,
  };
}
