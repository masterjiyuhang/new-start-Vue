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

export function copyObj() {
  if (!Array.isArray) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };
  }

  let name,
    options,
    src,
    copy,
    copyIsArray,
    clone,
    i = 1,
    // eslint-disable-next-line prefer-rest-params
    target = arguments[0] || {},
    deep = false,
    // eslint-disable-next-line prefer-const
    len = arguments.length;

  if (typeof target === "boolean") {
    deep = target;

    // eslint-disable-next-line prefer-rest-params
    target = arguments[i] || {};
    i++;
  }

  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }

  if (i === len) {
    return target;
  }

  for (; i < len; i++) {
    // eslint-disable-next-line prefer-rest-params
    if ((options = arguments[i]) !== null) {
      for (name in options) {
        src = target[name];

        copy = options[name];

        copyIsArray = Array.isArray(copy);

        if (deep && copy && (typeof copy !== "object" || copyIsArray)) {
          if (copyIsArray) {
            copyIsArray = false;

            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && typeof src === "object" ? src : {};
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          target[name] = copyObj(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
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
