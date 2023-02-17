import "./style/tailwind.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { setupStore } from "@/stores";
import App from "./App.vue";
import router from "./router";
import { initDom } from "./utils/positionToCode";
import { setupI18n } from "./locales/setupI18n";

// 用于开发模式 shift 定位 编译器中的代码
initDom();

async function bootstrap() {
  const app = createApp(App);
  await setupI18n(app);
  app.use(createPinia());
  setupStore;
  app.use(router);

  app.mount("#app");
}

bootstrap();
