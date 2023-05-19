import { http } from "@/utils/http";

const rep = "car-base";

export const getCarListApi = (params: any = {}) => {
  return http.request<any>("get", rep + "/car/list", { params });
};
export const getWBListApi = (params: any = {}) => {
  return http.request<any>("get", "https://tenapi.cn/v2/weibohot", { params });
};
