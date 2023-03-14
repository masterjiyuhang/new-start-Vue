import { http } from "@/utils/http";

export const getAccountListApi = (params: any = {}) => {
  return http.request("get", "/system/getAccountList", params);
};

// 获取公司列表
export const getCompanyListApi = (params: any = {}) => {
  return http.request("get", "/getCompanyList", params);
};
