import NProgress from "@/utils/progress";
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

  constructor() {
    this.axiosInstance = axios.create(defaultConfig);

    this.httpInterceptorsRequestHandler();
    this.httpInterceptorsResponseHandler();
  }

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
      debounceEnabled = false,
      debounceWait = 0,
      retryEnabled = false,
      retryCount = 0,
      cancelEnabled = false,
      cancelAfter = 0,
      ...axiosConfig
    } = config || {};

    console.log(debounceEnabled, debounceWait, "参数查看");

    // 发起请求
    const requestPromise = this.makeRequest<T>(method, url, axiosConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
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
      this.axiosInstance
        .request<T>({
          method,
          url,
          ...config,
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
        .finally(() => {});
    });
  }
}

export default HttpClient;
