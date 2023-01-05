import { useLocaleStoreWithOut } from "@/stores/modules/locale";
import type { LocaleType } from "@/stores/modules/locale";
import { computed, unref } from "vue";
import { i18n } from "./setupI18n";

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();
  console.log("执行！！！！！！！！！！！！！！！！！！！！！！");
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  console.log(localeStore.getLocale, "阿松大");
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();
  const getLocale = computed(() => localeStore.getLocale);

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    changeLocale,
  };
}
