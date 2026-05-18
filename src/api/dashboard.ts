import { get, post } from "@/utils/http";

export const getAccountListApi = (params?: any) => {
  return get("/system/getAccountList", { params });
};

export const getDashboardListApi = (data?: any) => {
  return post("/system/getDashboardList", data);
};

export const getCompanyListApi = (params?: any) => {
  return get("/system/getCompanyList", { params });
};
