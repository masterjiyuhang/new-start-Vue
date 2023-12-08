export const isClient = typeof window !== "undefined";

export const isDef = <T = any>(val?: T): val is T => typeof val !== "undefined";

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) console.warn(...infos);
};

const toString = Object.prototype.toString;

export const isBoolean = (val: any): val is boolean => typeof val === "boolean";

export const isFunction = <T extends Function>(val: any): val is T =>
  typeof val === "function";

export const isNumber = (val: any): val is number => typeof val === "number";

export const isString = (val: unknown): val is string =>
  typeof val === "string";

export const isObject = (val: any): val is object =>
  toString.call(val) === "[object Object]";

export const isWindow = (val: any): val is Window =>
  typeof window !== "undefined" && toString.call(val) === "[object Window]";

export const now = () => Date.now();

export const timestamp = () => +Date.now();

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const noop = () => {};

export const rand = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isIOS =
  /* #__PURE__ */ isClient &&
  window?.navigator?.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);

export const hasOwn = <T extends object, K extends keyof T>(
  val: T,
  key: K
): key is K => Object.prototype.hasOwnProperty.call(val, key);

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
  if (val === null) return "null";
  if (typeof val !== "object") return typeof val;
  else
    return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}
