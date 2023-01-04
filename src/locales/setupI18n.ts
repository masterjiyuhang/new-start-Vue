import { localeSetting, useLocaleStoreWithOut } from "@/stores/modules/locale";
import type { App } from "vue";
import type { I18n, I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";
import messages from "./message";

const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getLocale;

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    globalInjection: true,
    messages: messages,
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}
