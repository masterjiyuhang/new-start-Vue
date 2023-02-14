import type { Plugin } from "vite";

export const viteBuildInfo = (): Plugin => {
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig: { command: string }) {
      console.log(" current command is " + resolvedConfig.command);
    },
    buildStart() {
      console.log("Hi~ o(*￣▽￣*)ブ 幸存者！ 👏 欢迎光临二航大魔王的世界！");
    },
  };
};
