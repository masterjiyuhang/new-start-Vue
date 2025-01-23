import { isDev } from "@/utils";
import { http } from "@/utils/http";

// 获取公司列表
export const getRouterListApi = (params: any = {}) => {
  return http.request<any>("get", "/getRouterList", { params });
  // // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
  // return DynamicRouter;
};
// 获取公司列表
export const getAuthButtonListApi = (params: any = { userId: "asd" }) => {
  return http.request<any>("get", "/authButtonList", { params });
};

const carPrefix = "car-base";
// 登录系统接口
export const loginApi = (params: any = {}) => {
  if (isDev()) {
    return http.request<any>("post", `${carPrefix}/v1/api/auth/login`, {
      data: params,
    });
  } else {
    return http.request<any>("post", "/auth/login", { data: params });
  }
};

// 登出系统接口
export const logoutApi = (params: any = {}) => {
  return http.request<any>("post", "/logout", { data: params });
};
