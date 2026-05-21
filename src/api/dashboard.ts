import { get, post } from "@/utils/http";

export const getAccountListApi = (params?: Record<string, unknown>) => {
  return get("/system/getAccountList", { params });
};

export const getDashboardListApi = (data?: Record<string, unknown>) => {
  return post("/system/getDashboardList", data);
};

export const getCompanyListApi = (params?: Record<string, unknown>) => {
  return get("/system/getCompanyList", { params });
};
