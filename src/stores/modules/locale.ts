import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { store } from "..";
export type LocaleType = "zh_CN" | "en" | "ru" | "ja" | "ko";

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: "zh_CN",
  EN_US: "en",
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_CN,
  // Default locale
  fallback: LOCALE.ZH_CN,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: "locale",
  state: (): LocaleState => ({
    localInfo: localeSetting,
  }),
  getters: {
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? "zh_CN";
    },
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      console.log("设置本地信息", info);
      this.localInfo = { ...this.localInfo, ...info };
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
