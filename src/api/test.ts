import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import qs from "qs";

type RequestConfig = {
  cacheEnabled?: boolean; // 是否启用缓存，默认为 false
  cacheMaxAge?: number; // 缓存的最大时间，默认为 0，表示不过期
  debounceEnabled?: boolean; // 是否启用防抖，默认为 false
  debounceWait?: number; // 防抖等待时间，默认为 0
  retryEnabled?: boolean; // 是否启用自动重试，默认为 false
  retryCount?: number; // 自动重试次数，默认为 0
  cancelEnabled?: boolean; // 是否启用取消请求，默认为 false
  cancelAfter?: number; // 多少毫秒后取消请求，默认为 0，表示立即取消
};

// 检测传入的 URL 是否是完整的 URL
const isFullUrl = (url: string) => /^https?:\/\//i.test(url);

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
  private cache: Map<string, any>;
  private cancelTokens: Map<string, CancelTokenSource>;
  private isCanceling: boolean; // 取消标志位

  constructor() {
    this.axiosInstance = axios.create(defaultConfig);
    this.cache = new Map();
    this.cancelTokens = new Map();
    this.isCanceling = false; // 初始化取消标志位为 false
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
      debounceEnabled = false,
      debounceWait = 0,
      retryEnabled = false,
      retryCount = 0,
      cancelEnabled = false,
      cancelAfter = 0,
      ...axiosConfig
    } = config || {};

    // 生成缓存的键
    const cacheKey = `${method}-${url}`;

    // 检查缓存
    if (cacheEnabled && this.cache.has(cacheKey)) {
      const cachedData = this.cache.get(cacheKey);
      return Promise.resolve(cachedData);
    }

    // 防抖处理
    if (debounceEnabled) {
      return this.debounce(
        () => this.makeRequest<T>(method, url, axiosConfig),
        debounceWait
      );
    }

    // 取消请求
    if (cancelEnabled && cancelAfter > 0) {
      setTimeout(() => {
        this.cancelRequest(url);
      }, cancelAfter);
    }

    // 检查取消标志位，如果已取消，则返回一个已解决的 Promise
    if (this.isCanceling) {
      this.isCanceling = false; // 重置取消标志位为 false
      return Promise.resolve({});
    }

    // 发起请求
    const requestPromise = this.makeRequest<T>(method, url, axiosConfig)
      .then((response) => {
        // 缓存响应数据
        if (cacheEnabled && cacheMaxAge > 0) {
          this.cache.set(cacheKey, response);
          setTimeout(() => {
            this.cache.delete(cacheKey);
          }, cacheMaxAge);
        }
        return response;
      })
      .catch((error) => {
        // 自动重试
        if (retryEnabled && retryCount > 0) {
          return this.retry(
            () => this.makeRequest<T>(method, url, axiosConfig),
            retryCount,
            2000
          );
        }
        throw error;
      });

    return requestPromise;
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
    config?: AxiosRequestConfig
  ): Promise<T | any> {
    return new Promise<T>((resolve, reject) => {
      const cancelTokenSource = axios.CancelToken.source();
      const cancelToken = cancelTokenSource.token;

      // 保存取消令牌对象
      this.cancelTokens.set(url, cancelTokenSource);

      this.axiosInstance
        .request<T>({
          method,
          url,
          ...config,
          cancelToken,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const wrapperError = new Error(`Request failed for ${url}`);
          wrapperError.name = "HttpRequestError";
          wrapperError.message = error;
          reject(wrapperError);
        })
        .finally(() => {
          // 移除取消令牌对象
          this.cancelTokens.delete(url);
        });
    });
  }

  /**
   * 取消请求
   * @param url 请求 URL
   */
  public cancelRequest(url: string): void {
    const cancelTokenSource = this.cancelTokens.get(url);
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled");
      this.cancelTokens.delete(url);
    }
  }

  /**
   * 防抖函数
   * @param fn 要执行的函数
   * @param wait 等待时间
   */
  private debounce(fn: () => Promise<any>, wait: number): Promise<any> {
    let timer: NodeJS.Timeout;
    return new Promise((resolve) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        resolve(fn());
      }, wait);
    });
  }

  /**
   * 自动重试函数
   * @param fn 要执行的函数
   * @param count 重试次数
   */
  private retry(
    fn: () => Promise<any>,
    count: number,
    retryInterval: number
  ): Promise<any> {
    return fn().catch((error) => {
      if (count <= 0) {
        throw error;
      }
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve(this.retry(fn, count - 1, retryInterval));
        }, retryInterval);
      });
    });
  }

  /**
   * 发起 GET 请求
   * @param url 请求 URL
   * @param config 请求配置
   */
  public get<T>(
    url: string,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<T> {
    return this.request<T>("get", url, config);
  }

  /**
   * 发起 POST 请求
   * @param url 请求 URL
   * @param data 请求数据
   * @param config 请求配置
   */
  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, { ...config, data });
  }

  /**
   * 发起 PUT 请求
   * @param url 请求 URL
   * @param data 请求数据
   * @param config 请求配置
   */
  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<T> {
    return this.request<T>("put", url, { ...config, data });
  }

  /**
   * 发起 DELETE 请求
   * @param url 请求 URL
   * @param config 请求配置
   */
  public delete<T>(
    url: string,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<T> {
    return this.request<T>("delete", url, config);
  }
}

export default HttpClient;
const http = new HttpClient();

export const getWeiboHostListApi = () => {
  return http.get("https://tenapi.cn/v2/weibohot", {
    cancelEnabled: true,
    cancelAfter: 2000,
    debounceEnabled: true,
    debounceWait: 3000,
  });
};
