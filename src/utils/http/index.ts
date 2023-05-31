import NProgress from "@/utils/progress";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import LRU from "lru-cache";

type RequestConfig = {
  cacheEnabled?: boolean; // 是否启用缓存，默认为 false
  cacheMaxAge?: number; // 缓存的最大时间，默认为 0，表示不过期
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
  private defaultCache!: LRU<string, CacheEntry<any>>; // 缓存

  constructor() {
    this.axiosInstance = axios.create(defaultConfig);

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
    const { cacheEnabled = true, cacheMaxAge = 8000 } = baseConfig || {};

    this.defaultCache = new LRU<string, CacheEntry<any>>({
      ttl: cacheMaxAge,
      max: 100,
    });

    // 检查是否开启了缓存
    if (cacheEnabled) {
      const cacheKey = `${method}:${url}`;
      const cacheEntry = this.defaultCache.get(cacheKey);

      // 如果缓存存在 命中缓存 直接返回缓存数据
      if (cacheEntry) {
        console.log("命中缓存 直接走缓存");
        return Promise.resolve(cacheEntry);
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
          this.saveCache(baseConfig?.cacheEnabled, method, url, response);
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
      this.defaultCache.set(cacheKey, cacheEntry);
    }
  };
}
export const http = new HttpClient();
export default HttpClient;
