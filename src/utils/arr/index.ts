import type { MaybeComputedRefArgs } from "@/hooks/math/useMin";
import { toValue } from "vue";

/**
 * 数组去重
 */
type arr<T> = Array<T>;
export const uniqueArr = (arr: arr<any>) => [...new Set(arr)];

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce(
    (pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
      let flatArr = [...pre, current];
      if (current.children)
        flatArr = [...flatArr, ...getFlatArr(current.children)];
      return flatArr;
    },
    []
  );
}

export function toValueArgsFlat<T>(args: MaybeComputedRefArgs<T>): T[] {
  return args.flatMap((i: any) => {
    const v = toValue(i);
    if (Array.isArray(v)) return v.map((i) => toValue(i));
    return [v];
  });
}
