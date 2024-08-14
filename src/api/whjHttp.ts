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

    // 防抖函数初始化，只创建一次
    this.debounceRequest = debounce(
      this.handleDebouncedRequest.bind(this),
      800,
    );

    this.httpInterceptorsRequestHandler();
    this.httpInterceptorsResponseHandler();
  }

  // 请求拦截器
  private httpInterceptorsRequestHandler(): void {
    this.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig & RequestConfig): Promise<any> => {
        NProgress.start();
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  // 响应拦截器
  private httpInterceptorsResponseHandler(): void {
    this.axiosInstance.interceptors.response.use(
      async (response: any): Promise<any> => {
        NProgress.done();
        return response;
      },
      (error) => {
        NProgress.done();
        return Promise.reject(error);
      },
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
    config?: AxiosRequestConfig & RequestConfig,
  ): Promise<T | any> {
    const {
      cacheEnabled = false,
      cacheMaxAge = 0,
      debounceEnabled = true,
      debounceWait = 800,
    } = config || {};

    // 检查是否开启了缓存
    if (cacheEnabled) {
      const cacheKey = this.generateCacheKey(method, url, config);
      const cacheEntry = this.cache.get(cacheKey);
      if (cacheEntry && Date.now() - cacheEntry.timestamp <= cacheMaxAge) {
        console.log("命中缓存 直接走缓存");
        return Promise.resolve(cacheEntry.data);
      }
    }

    // 如果启用了防抖且等待时间大于 0，则使用防抖请求函数
    if (debounceEnabled && debounceWait > 0) {
      return this.sendDebouncedRequest<T>(method, url, config, debounceWait);
    }

    // 不使用防抖时立即发起请求
    return this.makeRequest<T>(method, url, config);
  }

  /**
   * 生成缓存键
   * @param method 方法
   * @param url 请求地址
   * @param config 请求配置
   */
  private generateCacheKey(
    method: string,
    url: string,
    config?: AxiosRequestConfig & RequestConfig,
  ): string {
    const params = config?.params ? JSON.stringify(config.params) : "";
    return `${method}:${url}:${params}`;
  }

  /**
   * 存储缓存
   * @param flag 是否开启存储缓存
   * @param method 方法
   * @param url 请求地址
   * @param response 返回数据
   */
  private saveCache(
    flag: boolean = false,
    method: string,
    url: string,
    config: AxiosRequestConfig & RequestConfig = {},
    response: any,
  ): void {
    if (flag) {
      const cacheKey = this.generateCacheKey(method, url, config);
      const cacheEntry: CacheEntry<any> = {
        data: response,
        timestamp: Date.now(),
      };
      this.cache.set(cacheKey, cacheEntry);
    }
  }

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
    debounceWait?: number,
  ): Promise<T | any> {
    // 取消上一次防抖请求
    if (this.debounceRequest) {
      console.log(
        "🚀 ~ file: whjHttp.ts:171 ~ HttpClient ~ debounceRequest:",
        "取消上一次",
      );
      this.debounceRequest.cancel();
    }

    // 发起防抖请求
    return new Promise<T>((resolve, reject) => {
      this.debounceRequest(
        {
          method,
          url,
          config,
          resolve,
          reject,
        },
        debounceWait,
      );
    });
  }

  private handleDebouncedRequest<T>(requestParams: {
    method: string;
    url: string;
    config: AxiosRequestConfig & RequestConfig;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
  }): void {
    const { method, url, config, resolve, reject } = requestParams;
    const source = axios.CancelToken.source();

    this.makeRequest<T>(method, url, {
      ...config,
      cancelToken: source.token,
    })
      .then((response) => {
        this.saveCache(config?.cacheEnabled, method, url, config, response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
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
    config?: AxiosRequestConfig & RequestConfig,
  ): Promise<T | any> {
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance
        .request<T>({
          method,
          url,
          ...config,
        })
        .then((response) => {
          this.saveCache(config?.cacheEnabled, method, url, config, response);
          resolve(response as any);
        })
        .catch((error) => {
          const wrapperError = new Error(`Request failed for ${url}`);
          wrapperError.name = "HttpRequestError";
          wrapperError.message = error.message || error.toString();
          reject(wrapperError);
        });
    });
  }
}

export default HttpClient;
