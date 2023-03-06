import { track, trigger } from "./effect";

const isObject = (val: any): val is object =>
  toString.call(val) === "[object Object]";
export const reactive = <T extends object>(target: T): any => {
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      track(target, key);
      if (isObject(res)) {
        return reactive(res);
      }
      return res;
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    },
  });
};
