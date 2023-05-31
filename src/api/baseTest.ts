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
