import { http } from "@/utils/http";

export const getAccountListApi = (params: any = {}) => {
  return http.request("get", "/system/getAccountList", params);
};
