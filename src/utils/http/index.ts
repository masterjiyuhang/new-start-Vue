import NProgress from "@/utils/progress";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import LRU from "lru-cache";
import { ElNotification } from "element-plus";
import { useGlobalSettingStoreWithOut } from "@/stores/modules/globalSetting";
import { API_PREFIX } from "@/config";

type RequestConfig = {
  cacheEnabled?: boolean; // 是否启用缓存
  cacheMaxAge?: number; // 缓存的最大时间
};

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  paramsSerializer: (params) => qs.stringify(params),
};

class HttpClient {
  private axiosInstance: AxiosInstance;
  private defaultCache: LRU<string, CacheEntry<any>>; // 缓存
  private isRefreshing = false; // 是否正在刷新 Token
  private requests: ((token: string) => void)[] = []; // 存储因 401 中断的请求

  constructor() {
    this.axiosInstance = axios.create(defaultConfig);

    this.defaultCache = new LRU<string, CacheEntry<any>>({
      ttl: 8000, // 默认缓存时间
      max: 100, // 缓存大小
    });

    this.httpInterceptorsRequestHandler();
    this.httpInterceptorsResponseHandler();
  }

  // 请求拦截器
  private httpInterceptorsRequestHandler(): void {
    this.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig & RequestConfig): Promise<any> => {
        NProgress.start();
        const globalStore = useGlobalSettingStoreWithOut();
        if (globalStore.token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${globalStore.token}`,
          };
        }
        return config;
      },
      (error) => {
        NProgress.done();
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
      async (error) => {
        NProgress.done();
        const { config, response } = error;
        if (response && response.status === 401) {
          return this.handleTokenRefresh(config);
        }
        return Promise.reject(error);
      },
    );
  }

  /**
   * 处理 Token 刷新逻辑
   * @param config 原请求配置
   */
  private async handleTokenRefresh(config: AxiosRequestConfig) {
    const globalStore = useGlobalSettingStoreWithOut();
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      try {
        const { data } = await this.axiosInstance.post(
          API_PREFIX + "/v1/api/auth/refresh",
          {
            refreshToken: `${globalStore.refreshToken}`,
          }, // 如果不需要请求体，则传入 null
          {
            headers: {
              "terminal-type": "PC",
              Authorization: `Bearer ${globalStore.refreshToken}`,
            },
          },
        );
        globalStore.token = data.data.accessToken;
        // 更新 Refresh Token（如果后端返回新的）
        globalStore.refreshToken = data.data.refreshToken;

        // 重新发起所有中断的请求
        this.requests.forEach((cb) => cb(data.data.accessToken));
        this.requests = [];

        // 重新发送当前请求
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${data.data.accessToken}`,
        };
        return this.axiosInstance(config);
      } catch (error) {
        // 刷新失败，清除 Token 并通知用户重新登录
        console.error("刷新 Token 失败", error);
        globalStore.token = null;
        globalStore.refreshToken = null;
        ElNotification({
          title: "登录过期",
          message: "请重新登录",
          type: "error",
        });
        // 此处可以添加跳转到登录页面的逻辑
        return Promise.reject(error);
      } finally {
        this.isRefreshing = false;
      }
    } else {
      // 当前已在刷新 Token，队列等待
      return new Promise((resolve) => {
        this.requests.push((token: string) => {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
          resolve(this.axiosInstance(config));
        });
      });
    }
  }

  /**
   * 发起请求
   * @param method 请求方法
   * @param url 请求 URL
   * @param params 请求参数
   * @param baseConfig 请求配置
   */
  public request<T>(
    method: string,
    url: string,
    params?: AxiosRequestConfig,
    baseConfig?: RequestConfig,
  ): Promise<T | any> {
    const { cacheEnabled = false } = baseConfig || {};

    // 如果启用缓存，检查缓存是否命中
    if (cacheEnabled) {
      const cacheKey = `${method}:${url}`;
      const cacheEntry = this.defaultCache.get(cacheKey);

      if (cacheEntry) {
        console.log("命中缓存，直接返回缓存数据");
        return Promise.resolve(cacheEntry.data);
      }
    }

    return new Promise((resolve, reject) => {
      const config = { method, url, ...params };
      this.axiosInstance
        .request(config)
        .then((response: any) => {
          this.saveCache(cacheEnabled, method, url, response);
          resolve(response.data);
        })
        .catch((error) => {
          ElNotification({
            title: "请求失败",
            message: error.message,
            type: "error",
          });
          reject(error);
        });
    });
  }

  public post<T>(
    url: string,
    data?: Record<string, any>,
    baseConfig?: RequestConfig,
  ): Promise<T | any> {
    const { cacheEnabled = false } = baseConfig || {};

    // 如果启用缓存，检查缓存是否命中
    if (cacheEnabled) {
      const cacheKey = `post:${url}`;
      const cacheEntry = this.defaultCache.get(cacheKey);

      if (cacheEntry) {
        console.log("命中缓存，直接返回缓存数据");
        return Promise.resolve(cacheEntry.data);
      }
    }

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(url, data)
        .then((response: any) => {
          this.saveCache(cacheEnabled, "post", url, response);
          resolve(response.data);
        })
        .catch((error) => {
          ElNotification({
            title: "请求失败",
            message: error.response.data.describe,
            type: "error",
          });
          reject(error);
        });
    });
  }

  public get<T>(
    url: string,
    params?: AxiosRequestConfig,
    baseConfig?: RequestConfig,
  ): Promise<T | any> {
    const { cacheEnabled = false } = baseConfig || {};

    // 如果启用缓存，检查缓存是否命中
    if (cacheEnabled) {
      const cacheKey = `post:${url}`;
      const cacheEntry = this.defaultCache.get(cacheKey);

      if (cacheEntry) {
        console.log("命中缓存，直接返回缓存数据");
        return Promise.resolve(cacheEntry.data);
      }
    }

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url, params)
        .then((response: any) => {
          this.saveCache(cacheEnabled, "get", url, response);
          resolve(response.data);
        })
        .catch((error) => {
          ElNotification({
            title: "请求失败",
            message: error.message,
            type: "error",
          });
          reject(error);
        });
    });
  }

  /**
   * 保存缓存
   * @param flag 是否启用缓存
   * @param method 请求方法
   * @param url 请求地址
   * @param response 请求响应
   */
  private saveCache(flag: boolean, method: string, url: string, response: any) {
    if (flag) {
      const cacheKey = `${method}:${url}`;
      const cacheEntry: CacheEntry<any> = {
        data: response.data,
        timestamp: Date.now(),
      };
      this.defaultCache.set(cacheKey, cacheEntry);
    }
  }
}

export const http = new HttpClient();
export const post = http.post.bind(http);
export const get = http.get.bind(http);

export default HttpClient;
