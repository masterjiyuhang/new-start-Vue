import { isProxy, toRaw } from "vue";
import type { RouteRecordRaw } from "vue-router";

export const findCurrentRouteByPath = (
  path: string,
  routes: RouteRecordRaw[]
) => {
  let res = routes.find((item) => item.path === path);

  if (res) {
    return isProxy(res) ? toRaw(res) : res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (
        routes[i].children instanceof Array &&
        routes[i].children!.length > 0
      ) {
        res = findCurrentRouteByPath(path, routes[i].children!);
        if (res) {
          return isProxy(res) ? toRaw(res) : res;
        }
      }
    }
  }
  return null;
};

const loadEnv = () => {
  return import.meta.env;
};

function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}

/**
 * 数组去重
 */
type arr<T> = Array<T>;
export const uniqueArr = (arr: arr<any>) => [...new Set(arr)];

/**
 * 判断设备类型
 * @returns 设备类型
 */
export const getCurrentDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "PC";

/**
 * 判断两日期之间的天数
 * @param date1
 * @param date2
 * @returns
 */
export const getDays = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

/**
 * rgb转换为 15进制
 * @param r
 * @param g
 * @param b
 * @returns
 */
export const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

export { loadEnv, wrapperEnv };
