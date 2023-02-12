import { createApp } from "vue";
import { createPinia } from "pinia";
import { setupI18n } from "@/locales/setupI18n";
import { setupStore } from "@/stores";
import App from "./App.vue";
import router from "./router";
import "@/style/erHangBaseStyle/index.scss";
import "./style/tailwind.css";
import "./assets/main.css";
import "./style/index.scss";

async function bootstrap() {
  const app = createApp(App);

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app);
  app.use(createPinia());
  setupStore;
  app.use(router);

  app.mount("#app");
}

bootstrap();
