import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export const configComponentPlugin = () => {
  const plugins = [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ["vue", "vue-router"],
      dts: "auto-import.d.ts", // 生成的类型文件
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./src/types/.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dirs: [],
      vueTemplate: true,
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      dts: "components.d.ts",
    }),
    ElementPlus({
      useSource: true,
    }),
  ];

  return plugins;
};
