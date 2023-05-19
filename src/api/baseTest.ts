import Http from "./whjHttp";

const http = new Http();

export const getWeiboHostListApi = () => {
  return http.request("get", "https://tenapi.cn/v2/weibohot", {
    // cancelEnabled: true,
    // cancelAfter: 1000,
    debounceEnabled: true,
    debounceWait: 2000,
  });
};

// 获取公司列表
export const getCompanyListApi = (params: any = {}) => {
  return http.request("get", "/getCompanyList", {
    ...params,
    // cancelEnabled: true,
    cancelAfter: 1000,
    // debounceEnabled: true,
    // debounceWait: 800,
    // cacheEnabled: true, // 启用缓存
    // cacheMaxAge: 60 * 1000,
  });
};

// /**
//  * 发起 GET 请求
//  * @param url 请求 URL
//  * @param config 请求配置
//  */
// public get<T>(
//   url: string,
//   params?: any,
//   config?: AxiosRequestConfig & RequestConfig
// ): Promise<T> {
//   return this.request<T>("get", url, { ...params, ...config });
// }

// /**
//  * 发起 POST 请求
//  * @param url 请求 URL
//  * @param data 请求数据
//  * @param config 请求配置
//  */
// public post<T>(
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig & RequestConfig
// ): Promise<T> {
//   return this.request<T>("post", url, { ...config, data });
// }

// /**
//  * 发起 PUT 请求
//  * @param url 请求 URL
//  * @param data 请求数据
//  * @param config 请求配置
//  */
// public put<T>(
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig & RequestConfig
// ): Promise<T> {
//   return this.request<T>("put", url, { ...config, data });
// }

// /**
//  * 发起 DELETE 请求
//  * @param url 请求 URL
//  * @param config 请求配置
//  */
// public delete<T>(
//   url: string,
//   config?: AxiosRequestConfig & RequestConfig
// ): Promise<T> {
//   return this.request<T>("delete", url, config);
// }
