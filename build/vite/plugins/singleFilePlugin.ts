import { viteSingleFile } from "vite-plugin-singlefile";

// 页面输出成单页html
export const configSingleFile = () => {
  return viteSingleFile({ removeViteModuleLoader: true });
};
