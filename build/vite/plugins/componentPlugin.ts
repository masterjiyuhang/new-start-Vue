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
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./src/types/.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
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
