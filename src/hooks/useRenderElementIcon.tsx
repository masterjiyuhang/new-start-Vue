import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { Component, DefineComponent, defineComponent, h } from "vue";

export interface IconProps {
  style?: object;
  color?: string;
  width?: string | number;
  height?: string | number;
}

export const renderElementIcon = (icon: string, attrs?: IconProps): Component => {
  const IconComp = (
    ElementPlusIconsVue as unknown as { [key: string]: DefineComponent }
  )[icon];

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
