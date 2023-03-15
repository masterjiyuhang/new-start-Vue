import { http } from "@/utils/http";

// 获取公司列表
export const getRouterListApi = (params: any = {}) => {
  return http.request<any>("get", "/getRouterList", params);
};
// 获取公司列表
export const getAuthButtonListApi = (params: any = {}) => {
  return http.request<any>("get", "/authButtonList", params);
};

export const loginApi = (params: any = {}) => {
  return http.request<any>("post", "/login", params);
};
