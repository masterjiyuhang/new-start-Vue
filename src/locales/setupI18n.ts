import type { App } from "vue";
import type { I18n, I18nOptions } from "vue-i18n";

import { createI18n } from "vue-i18n";
import zhCN from "./lang/zh-CN";
import en from "./lang/en";

const createI18nOptions = async (): Promise<I18nOptions> => {
  // const locale = Math.random() * 100 > 50 ? "zh-CN" : "en";
  // const defaultLocal = await import(`./lang/${locale}.ts`);
  // const message = defaultLocal.default?.message ?? {};

  return {
    legacy: false,
    locale: "zh-CN",
    fallbackLocale: "zh-CN",
    messages: {
      // [locale]: message,
      "zh-CN": zhCN.message,
      en: en.message,
    },
    availableLocales: ["en", "zh-CN"],
    globalInjection: true, // 全局注册$t方法
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
};
export const setupI18n = async (app: App) => {
  const i18nOptions = await createI18nOptions();

  // console.log(i18nOptions, "i18n options");
  app.use(createI18n(i18nOptions) as I18n);
};
