import { http } from "@/utils/http";

const carPrefix = "car-base";

export const getWeiboApi = () => {
  return http.request<any>("get", "ten-api/v2/weibohot");
};

export const getCarTypeList = () => {
  return http.request("get", `${carPrefix}/v1/api/carType/all`);
};
