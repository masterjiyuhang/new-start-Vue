import { isDev } from "@/utils";

// * 首页地址（默认）
export const HOME_URL = "/home/index";

// * 登录页地址（默认）
export const LOGIN_URL = "/login";

// * 默认主题颜色
export const DEFAULT_PRIMARY = "#fd521d";

// * 路由白名单地址（必须是本地存在的路由 staticRouter.ts）
export const ROUTER_WHITE_LIST: string[] = ["/500"];

export const API_PREFIX = isDev() ? "car-base" : "";
