import "./style/tailwind.css";
import "@/style/BaseStyle/index.scss";
import "vant/lib/index.css";

import { createApp } from "vue";
import { setupStore } from "@/stores";
import App from "./App.vue";
import router from "./router";
import { initDom } from "./utils/positionToCode";
import { setupI18n } from "./locales/setupI18n";
// customer directives
import directives from "@/directives/index";
// customer component
import { setupComp } from "@/components";

import "virtual:svg-icons-register"; // 自定义icon

// 用于开发模式 shift 定位 编译器中的代码
import.meta.env.MODE === "development" && initDom();

async function bootstrap() {
  // window.process = { ...window.process, env: { LOGGER_LEVEL: "warn" } };
  const app = createApp(App);

  // 初始化自定义组件
  setupComp(app);

  await setupI18n(app);
  setupStore(app);

  app.use(router);

  // app.config.unwrapInjectedRef = true; // vue3.3开始已经默认打开

  app.mount("#app");

  app.use(directives);
}

bootstrap();
