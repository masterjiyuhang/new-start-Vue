import { get, http, post } from "@/utils/http";

export const getCarListApi = (params: { page: number; size: number }) => {
  return http.request("get", "/car/list", { params: { page: params.page, pageSize: params.size } });
};

export const createCarApi = (data: any) => {
  return post("/car/create", data);
};

export const updateCarApi = (data: any) => {
  return post("/car/update", data);
};

export const delCarApi = (data: any) => {
  return post("/car/del", data);
};

export const getCarByNameApi = (data: any) => {
  return post("/car/getListByName", data);
};

export const getCarDetailApi = (id: string) => {
  return get(`/car/detail/${id}`);
};

export const getCarTypeListApi = () => {
  return get("/carType/all");
};
