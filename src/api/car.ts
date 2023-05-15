import { http } from "@/utils/http";

const rep = "car-base";

export const getCarListApi = (params: any = {}) => {
  return http.request<any>("get", rep + "/car/list", params);
};
