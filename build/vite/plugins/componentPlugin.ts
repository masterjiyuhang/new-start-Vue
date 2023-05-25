import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export const configComponentPlugin = () => {
  const plugins = [
    AutoImport({
      imports: ["vue"],
      dts: "auto-import.d.ts", // 生成的类型文件
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    ElementPlus({
      useSource: true,
    }),
  ];

  return plugins;
};
