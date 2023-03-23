import "./style/tailwind.css";
import { createApp } from "vue";
// import { createPinia } from "pinia";
import { setupStore } from "@/stores";
import App from "./App.vue";
import router from "./router";
import { initDom } from "./utils/positionToCode";
import { setupI18n } from "./locales/setupI18n";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// custom directives
import directives from "@/directives/index";

import "@/style/erHangBaseStyle/index.scss";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/style/element/theme-dark.scss";

// 用于开发模式 shift 定位 编译器中的代码
initDom();

async function bootstrap() {
  const app = createApp(App);

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  await setupI18n(app);
  setupStore(app);

  app.use(router);

  app.config.unwrapInjectedRef = true;

  app.mount("#app");

  app.use(directives);
}

bootstrap();
