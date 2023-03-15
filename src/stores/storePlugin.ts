import { PersistedStateOptions } from "pinia-plugin-persistedstate";

export const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: localStorage,
    // storage: sessionStorage,
    paths,
  };
  return persist;
};
