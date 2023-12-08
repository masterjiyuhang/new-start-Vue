import { viteMockServe } from "vite-plugin-mock";

export const configMockPlugin = ({ isBuild }: { isBuild: boolean }) => {
  return viteMockServe({
    ignore: /^_/,
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `,
  });
};
