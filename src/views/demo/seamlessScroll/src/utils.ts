/**
 * 判断数组是否相等
 * @param arr1
 * @param arr2
 * @returns {Boolean}
 */
export const arrayIsEqual = (arr1: Array<any>, arr2: Array<any>) => {
  if (arr1 === arr2) return true;

  if (arr1.length != arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] === arr2[i]) return true;
  }
  return true;
};

export function copyObj(...args) {
  if (!Array.isArray) {
    Array.isArray = (arg: any): any =>
      Object.prototype.toString.call(arg) === "[object Array]";
  }

  let [target, ...sources] = args;
  let deep = false;

  if (typeof target === "boolean") {
    deep = target;
    [target, ...sources] = sources;
  }

  if (typeof target !== "object" || target === null) {
    target = {};
  }

  for (const source of sources) {
    if (source !== null && typeof source === "object") {
      for (const name in source) {
        if (Object.prototype.hasOwnProperty.call(source, name)) {
          const src = target[name];
          const copy = source[name];

          if (
            deep &&
            copy &&
            (typeof copy === "object" || Array.isArray(copy))
          ) {
            target[name] = copyObj(deep, src, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
  }

  return target;
}

export const animationFrame = () => {
  window.cancelAnimationFrame = (() => {
    return (
      window.cancelAnimationFrame ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.webkitCancelAnimationFrame ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.mozCancelAnimationFrame ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.oCancelAnimationFrame ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.msCancelAnimationFrame ||
      function (id) {
        return window.clearTimeout(id);
      }
    );
  })();

  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.webkitRequestAnimationFrame ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.mozRequestAnimationFrame ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.oRequestAnimationFrame ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
};
