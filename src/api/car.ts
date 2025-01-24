import { API_PREFIX } from "@/config";
import { http } from "@/utils/http";

export const getWeiboApi = () => {
  return http.request<any>("get", "ten-api/v2/weibohot");
};

export const getCarTypeList = () => {
  return http.request("get", `${API_PREFIX}/v1/api/carType/all`);
};
