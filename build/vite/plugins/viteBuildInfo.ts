import type { Plugin } from "vite";
import chalk from "chalk";

export const viteBuildInfo = (): Plugin => {
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig: { command: string; mode: string }) {
      console.log(
        chalk.green(
          `当前的command是   ${chalk.yellowBright(resolvedConfig.command)} ，`,
        ) +
          chalk.green(
            `当前的mode是   ${chalk.yellowBright(resolvedConfig.mode)}`,
          ),
      );
    },
    buildStart() {
      console.log(chalk.yellowBright("Hi~ o(*￣▽￣*)ブ ！ 👏 欢迎光临！"));
    },
  };
};
