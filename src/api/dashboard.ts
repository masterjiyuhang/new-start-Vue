import { http } from "@/utils/http";

export const getDashboardListApi = (params: any = {}) => {
  return http.request<any>("get", "/system/getDashboardList", params);
};
