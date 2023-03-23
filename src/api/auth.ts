import { http } from "@/utils/http";

// 获取公司列表
export const getRouterListApi = (params: any = {}) => {
  return http.request<any>("get", "/getRouterList", params);
  // // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
	// return DynamicRouter;
};
// 获取公司列表
export const getAuthButtonListApi = (params: any = {}) => {
  return http.request<any>("get", "/authButtonList", params);
};

export const loginApi = (params: any = {}) => {
  return http.request<any>("post", "/login", params);
};

export const logoutApi = (params: any = {}) => {
  return http.request<any>("post", "/logout", params);
};
