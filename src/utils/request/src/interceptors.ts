import NProgress from "@/utils/progress";
import { isFunction, isUndefined } from "lodash";

export const [requestResolve, requestReject]: [
  (args: { options: any; value: any }) => any,
  (args: { options: any; value: any }) => any
] = [
  function resolve({ options, value }) {
    NProgress.start();
    const { LOADING } = options;
    const { $requestResolve, $loading } = options;
    // 未考虑 是promise 的情况
    const config = isFunction($requestResolve) ? $requestResolve(value) : value;
    // 自动loading 判断是否开启自动loading了
    if (config.isLoading) {
      // 向队列中添加请求地址
      LOADING.loadings.push(config.url);
      if (!LOADING.isLoading) {
        // 获取config中的loading配置
        const loadingConfig = config.loadingConfig;
        if (isUndefined(loadingConfig.target)) {
          delete loadingConfig.target;
        }
        LOADING.$loading = $loading(config.loadingConfig);
      }
    }
    return config;
  },

  function reject({ options, value }) {
    const { $requestReject } = options;
    if (isFunction($requestReject)) {
      return $requestReject(value);
    }
    return Promise.reject(value);
  },
];

export const [responseResolve, responseReject]: [
  (args: { options: any; value: any }) => any,
  (args: { options: any; value: any }) => any
] = [
  async function resolve({ options, value }) {
    NProgress.done();
    const { LOADING, transformResponse } = options;
    const { $responseResolve, $message, $autoMessageAdapter } = options;
    const { config } = value;
    // 先处理 loading
    if (config.isLoading) {
      const index = LOADING.loadings.indexOf(config.url);
      LOADING.loadings.splice(index, 1);
      if (LOADING.$loading && LOADING.loadings.length === 0) {
        LOADING.$loading.close();
        LOADING.$loading = null;
        LOADING.isLoading = false;
      }
    }

    let response: any = null;
    try {
      response = isFunction($responseResolve)
        ? await $responseResolve(value)
        : value;
      const isAutoMessage = $autoMessageAdapter(response);
      if (!isAutoMessage) {
        console.log("正常处理 返回数据");
        return transformResponse(response.data);
      }
      // 是否自动提示消息
      if (config.isAutoMsg) {
        $message(response, false, value);
      }
      return Promise.reject(response.data);
    } catch (error) {
      // 如果本身就返回错误 直接 reject 回去
      return Promise.reject(error);
    }
  },

  async function reject({ options, value }) {
    NProgress.done();
    const { LOADING, errorMsg } = options;
    LOADING.loadings = [];
    if (LOADING.$loading) {
      LOADING.$loading.close();
      LOADING.$loading = null;
    }
    LOADING.isLoading = false;

    const { $responseReject, $message } = options;
    let error: any = null;

    try {
      error = isFunction($responseReject)
        ? await $responseReject(value)
        : value;
      if (errorMsg) {
        $message(errorMsg, true, value);
      }
      return Promise.reject(error);
    } catch (err) {
      return Promise.reject(err);
    }
  },
];
