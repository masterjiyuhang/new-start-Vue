import Http from "./whjHttp";

const http = new Http();

export const getWeiboHostListApi = () => {
  return http.request("get", "ten-api/v2/weibohot", {
    cacheEnabled: true,
    cacheMaxAge: 5 * 60 * 1000,
  });
};

// 获取公司列表
export const getTestListApi = (params: any = {}) => {
  return http.request("get", "/getCompanyList", {
    ...params,
  });
};

const carPrefix = "car-base";

export const getCarListApi = (data) => {
  return http.request(
    "get",
    `${carPrefix}/v1/api/car/list?page=${data.page}&pageSize=${data.size}`,
  );
};
export const createCarApi = (params) => {
  return http.request("post", `${carPrefix}/v1/api/car/create`, {
    data: params,
  });
};

export const delCarApi = (params) => {
  return http.request("post", `${carPrefix}/v1/api/car/del`, {
    data: params,
  });
};

export const getCarByNameApi = (params: any = {}) => {
  return http.request("post", `${carPrefix}/v1/api/car/getListByName`, {
    data: params,
  });
};

export const getCarDetailApi = (id: string) => {
  return http.request("get", `${carPrefix}/v1/api/car/detail/${id}`);
};
