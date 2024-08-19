import BaseStorage, { KEY_PREFIX } from "./BaseStorage";

export default class BrowserNativeStorage extends BaseStorage {
  constructor() {
    super();
  }
  public static get works() {
    return typeof localStorage !== "undefined" && localStorage.getItem;
  }

  public async load<T>(name: string, defaultValue: T): Promise<T> {
    const result = localStorage.getItem(name);
    if (result === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(result);
    } catch {
      return defaultValue;
    }
  }

  protected async save<T>(name: string, value: T): Promise<void> {
    localStorage.setItem(name, JSON.stringify(value));
  }

  public async remove(name: string): Promise<void> {
    localStorage.removeItem(name);
  }

  public async getAll(): Promise<Record<string, any>> {
    const result = {};
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.startsWith(KEY_PREFIX)) {
        try {
          Object.assign(result, { [key]: JSON.parse(value) });
        } catch {}
      }
    }

    return result;
  }
  public async setAll(obj: Record<string, any>): Promise<void> {
    for (const [key, value] of Object.entries(obj)) {
      await this.save(key, value);
    }
  }
}
