import http from "@/utils/request/index";

// 获取公司列表
export const getTestListApi = (params: any = {}) => {
  return http.request("get", "/getCompanyList", {
    ...params,
  });
};

// 获取公司列表
export const getCompanyListApi = (params: any = {}) => {
  return http.request<any>("get", "/getCompanyList", { params });
};

// 登出系统接口
export const logoutApi = (params: any = {}) => {
  return http.request<any>("post", "/logout", { data: params });
};

export const getRouterListApi = (params: any = {}) => {
  return http.request<any>("get", "/getRouterList", { params });
  // // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
  // return DynamicRouter;
};

export const getAuthButtonListApi = (params: any = {}) => {
  return http.request<any>("get", "/authButtonList", { params });
};

export const getAccountListApi = (params: any = {}) => {
  return http.request<any>("get", "/system/getAccountList", { params });
};

export const getDashboardListApi = (
  params: any = {
    name: "erhang",
  },
) => {
  return http.request<any>("post", "/system/getDashboardList", {
    data: params,
  });
};

export const mockLoginApi = (params) => {
  return http.request<any>("post", "/system/login", {
    data: params,
  });
};
