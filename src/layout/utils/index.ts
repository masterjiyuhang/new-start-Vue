/* eslint-disable */
const hasOwnProperty = Object.prototype.hasOwnProperty;

const _toString = Object.prototype.toString;

export function hasOwn(obj: any, key: any) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Remove an item from an array
 */
export function remove(arr: any, item: any) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

export function isRegExp(v: any) {
  return _toString.call(v) === "[object RegExp]";
}

export function isAsyncPlaceholder(node: any) {
  return node.isComment && node.asyncFactory;
}

export function isDef(v: any) {
  return v !== undefined && v !== null;
}

export function getFirstComponentChild(children: any) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

/**
 * @desc 是否是 Array 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
export function isArray(obj: any): any {
  return Array.isArray
    ? Array.isArray(obj)
    : Object.prototype.toString.call(obj) === "[object Array]";
}
