import { API_PREFIX } from "@/config";
import { http } from "@/utils/http";
// import Http from "./whjHttp";

// const http = new Http();

export const getWeiboHostListApi = () => {
  return http.request("get", "ten-api/v2/weibohot");
};

export const getCarListApi = (data) => {
  return http.request(
    "get",
    `${API_PREFIX}/v1/api/car/list?page=${data.page}&pageSize=${data.size}`,
  );
};
export const createCarApi = (params) => {
  return http.request("post", `${API_PREFIX}/v1/api/car/create`, {
    data: params,
  });
};
export const updateCarApi = (params) => {
  return http.request("post", `${API_PREFIX}/v1/api/car/update`, {
    data: params,
  });
};

export const delCarApi = (params) => {
  return http.request("post", `${API_PREFIX}/v1/api/car/del`, {
    data: params,
  });
};

export const getCarByNameApi = (params: any = {}) => {
  return http.request("post", `${API_PREFIX}/v1/api/car/getListByName`, {
    data: params,
  });
};

export const getCarDetailApi = (id: string) => {
  return http.request("get", `${API_PREFIX}/v1/api/car/detail/${id}`);
};
