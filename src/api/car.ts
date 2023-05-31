import { http } from "@/utils/http";

export const getWeiboApi = () => {
  return http.request<any>("get", "ten-api/v2/weibohot");
};
