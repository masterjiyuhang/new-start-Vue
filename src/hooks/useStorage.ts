import { isClient } from "@/utils/is";
import { ref, shallowRef, unref } from "vue";

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window;
}
export interface Serializer<T> {
  read(raw: string): T;
  write(value: T): string;
}

export interface UseStorageOptions<T> extends ConfigurableWindow {
  deep?: boolean;
  listenToStorageChanges?: boolean;
  writeDefaults?: boolean;
  serializer?: Serializer<T>;
  onError?: (error: unknown) => void;
  shallow?: boolean;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const defaultWindow = isClient ? window : undefined;
export function useStorage<T extends string | number | boolean | object | null>(
  key,
  defaults,
  storage: StorageLike | undefined,
  options: UseStorageOptions<T> = {}
) {
  const { shallow, onError } = options;
  const data = (shallow ? shallowRef : ref)(defaults);

  if (!storage) {
    try {
      storage = defaultWindow?.localStorage;
    } catch (e) {
      onError(e);
    }
  }

  if (!storage) return data;

  const rawInit: T =
    typeof defaults === "function" ? (defaults as any)() : unref(defaults);
  const rawInitType = guessSerializerType(rawInit);
  const serializer = options.serializer ?? StorageSerializers[rawInitType];
}

export function useSessionStorage(key, value?) {
  const res = sessionStorage.getItem(key);
  console.log(res, "resss");
  if (res === undefined) {
    return ref("暂无数据");
  }
  return res;
}

export function guessSerializerType<
  T extends string | number | boolean | object | null
>(rawInit: T) {
  return rawInit == null
    ? "any"
    : rawInit instanceof Set
    ? "set"
    : rawInit instanceof Map
    ? "map"
    : rawInit instanceof Date
    ? "date"
    : typeof rawInit === "boolean"
    ? "boolean"
    : typeof rawInit === "string"
    ? "string"
    : typeof rawInit === "object"
    ? "object"
    : !Number.isNaN(rawInit)
    ? "number"
    : "any";
}

export const StorageSerializers: Record<
  "boolean" | "object" | "number" | "any" | "string" | "map" | "set" | "date",
  Serializer<any>
> = {
  boolean: {
    read: (v: any) => v === "true",
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) =>
      JSON.stringify(Array.from((v as Map<any, any>).entries())),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
};
