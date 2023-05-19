import NProgress from "@/utils/progress";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import LRU from "lru-cache";

type RequestConfig = {
  cacheEnabled?: boolean; // 是否启用缓存，默认为 false
  cacheMaxAge?: number; // 缓存的最大时间，默认为 0，表示不过期
  debounceEnabled?: boolean; // 是否启用防抖，默认为 false
  debounceWait?: number; // 防抖等待时间，默认为 0
  retryEnabled?: boolean; // 是否启用自动重试，默认为 false
  retryCount?: number; // 自动重试次数，默认为 0
};

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_API ?? "/",
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: (params) => qs.stringify(params),
};

class HttpClient {
  private axiosInstance: AxiosInstance;
  private cache: LRU<string, CacheEntry<any>>; // 缓存

  constructor() {
    this.axiosInstance = axios.create(defaultConfig);
    this.cache = new LRU<string, CacheEntry<any>>({ max: 100 });

    this.httpInterceptorsRequestHandler();
    this.httpInterceptorsResponseHandler();
  }

  // 请求拦截器
  private httpInterceptorsRequestHandler(): void {
    this.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig & RequestConfig): Promise<any> => {
        // 开启进度条动画
        NProgress.start();
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截器
  private httpInterceptorsResponseHandler(): void {
    this.axiosInstance.interceptors.response.use(
      async (response: any): Promise<any> => {
        // 开启进度条动画
        NProgress.done();
        return response;
      },
      (error) => {
        NProgress.done();
        return Promise.reject(error);
      }
    );
  }

  /**
   * 发起请求
   * @param method 请求方法
   * @param url 请求 URL
   * @param config 请求配置
   */
  public request<T>(
    method: string,
    url: string,
    params?: AxiosRequestConfig,
    baseConfig?: RequestConfig
  ): Promise<T | any> {
    const {
      cacheEnabled = true,
      cacheMaxAge = 8000,
      // retryEnabled = false,
      // retryCount = 0,
    } = baseConfig || {};

    // 检查是否开启了缓存
    if (cacheEnabled) {
      const cacheKey = `${method}:${url}`;
      const cacheEntry = this.cache.get(cacheKey);

      let cacheHit = false; // 标志变量，用于判断是否已经返回过缓存结果
      // 如果缓存存在并且缓存没有过期 命中缓存 直接返回缓存数据
      if (cacheEntry && Date.now() - cacheEntry.timestamp <= cacheMaxAge) {
        console.log("命中缓存 直接走缓存");
        if (!cacheHit) {
          cacheHit = true;
          return Promise.resolve(cacheEntry.data);
        }
      }
    }

    return new Promise((resolve, reject) => {
      const config = {
        method,
        url,
        ...params,
        ...baseConfig,
      };
      this.axiosInstance
        .request(config)
        .then((response: any) => {
          // Cache the response if cacheEnabled is true
          this.saveCache(baseConfig?.cacheEnabled, method, url, response);
          // this.saveCache(true, method, url, response);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 存储缓存
   * @param flag 是否开启存储缓存
   * @param method 方法
   * @param url 请求地址
   * @param response 返回数据
   */
  private saveCache = (flag, method, url, response) => {
    if (flag) {
      const cacheKey = `${method}:${url}`;
      const cacheEntry: CacheEntry<any> = {
        data: response,
        timestamp: Date.now(),
      };
      this.cache.set(cacheKey, cacheEntry);
    }
  };
}
export const http = new HttpClient();
export default HttpClient;
