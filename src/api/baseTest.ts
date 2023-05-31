import Http from "./whjHttp";

const http = new Http();

export const getWeiboHostListApi = () => {
  return http.request("get", "https://tenapi.cn/v2/weibohot", {});
};

// 获取公司列表
export const getTestListApi = (params: any = {}) => {
  return http.request("get", "/getCompanyList", {
    ...params,
  });
};
