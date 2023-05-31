import NProgress from "@/utils/progress";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { debounce } from "lodash";
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
  private debounceRequest: any; // 防抖请求函数
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
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<T | any> {
    const {
      cacheEnabled = false,
      cacheMaxAge = 0,
      // retryEnabled = false,
      // retryCount = 0,
      debounceEnabled = true,
      debounceWait = 800,
    } = config || {};

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

    // 如果启用了防抖且等待时间大于 0，则使用防抖请求函数
    if (debounceEnabled && debounceWait > 0) {
      return this.sendDebouncedRequest<T>(method, url, config, debounceWait);
    }

    // 不使用取消重复请求和防抖时立即发起请求
    return this.makeRequest<T>(method, url, config);
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

  /**
   * 发起防抖请求
   * @param method 请求方法
   * @param url 请求 URL
   * @param config 请求配置
   * @param debounceWait 防抖等待时间
   */
  private sendDebouncedRequest<T>(
    method: string,
    url: string,
    config?: AxiosRequestConfig & RequestConfig,
    debounceWait?: number
  ): Promise<T | any> {
    if (this.debounceRequest) {
      // 取消上一次防抖请求
      this.debounceRequest.cancel();
    }

    // 创建 CancelTokenSource
    const source = axios.CancelToken.source();

    return new Promise<T>((resolve, reject) => {
      // 创建防抖请求函数，并将防抖等待时间作为参数传递
      this.debounceRequest = debounce(() => {
        // 发起请求
        this.makeRequest<T>(method, url, {
          ...config,
          cancelToken: source.token,
        })
          .then((response) => {
            // Cache the response if cacheEnabled is true
            this.saveCache(config?.cacheEnabled, method, url, response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.debounceRequest = null; // 请求完成后重置防抖请求函数
          });
      }, debounceWait);

      // 调用防抖请求函数
      this.debounceRequest();
    });
  }

  /**
   * 发起请求
   * @param method 请求方法
   * @param url 请求 URL
   * @param config 请求配置
   */
  private makeRequest<T>(
    method: string,
    url: string,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<T | any> {
    console.log("普通请求开始");
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance
        .request<T>({
          method,
          url,
          ...config,
        })
        .then((response) => {
          // Cache the response if cacheEnabled is true
          this.saveCache(config?.cacheEnabled, method, url, response);
          resolve(response as any);
        })
        .catch((error) => {
          const wrapperError = new Error(`Request failed for ${url}`);
          wrapperError.name = "HttpRequestError";
          wrapperError.message = error;
          reject(wrapperError);
        })
        .finally(() => {});
    });
  }
}

export default HttpClient;
