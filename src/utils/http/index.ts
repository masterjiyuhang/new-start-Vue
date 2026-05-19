import NProgress from "@/utils/progress";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import LRU from "lru-cache";
import { ElNotification } from "element-plus";
import { useGlobalSettingStoreWithOut } from "@/stores/modules/globalSetting";

type RequestConfig = {
  cacheEnabled?: boolean;
  cacheMaxAge?: number;
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
  private defaultCache: LRU<string, CacheEntry<any>>;
  private isRefreshing = false;
  private requests: ((token: string) => void)[] = [];

  constructor() {
    this.axiosInstance = axios.create(defaultConfig);

    this.defaultCache = new LRU<string, CacheEntry<any>>({
      ttl: 8000,
      max: 100,
    });

    this.httpInterceptorsRequestHandler();
    this.httpInterceptorsResponseHandler();
  }

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

  private async handleTokenRefresh(config: AxiosRequestConfig) {
    const globalStore = useGlobalSettingStoreWithOut();
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      try {
        const { data } = await this.axiosInstance.post(
          "/auth/refresh",
          {
            refreshToken: `${globalStore.refreshToken}`,
          },
          {
            headers: {
              "terminal-type": "PC",
              Authorization: `Bearer ${globalStore.refreshToken}`,
            },
          },
        );
        globalStore.token = data.data.accessToken;
        globalStore.refreshToken = data.data.refreshToken;

        this.requests.forEach((cb) => cb(data.data.accessToken));
        this.requests = [];

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${data.data.accessToken}`,
        };
        return this.axiosInstance(config);
      } catch (error) {
        globalStore.token = null;
        globalStore.refreshToken = null;
        ElNotification({
          title: "登录过期",
          message: "请重新登录",
          type: "error",
        });
        return Promise.reject(error);
      } finally {
        this.isRefreshing = false;
      }
    } else {
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

  private getFromCache<T>(cacheKey: string): T | null {
    const cacheEntry = this.defaultCache.get(cacheKey);
    return cacheEntry ? cacheEntry.data : null;
  }

  private saveCache(flag: boolean, cacheKey: string, data: any) {
    if (flag) {
      const cacheEntry: CacheEntry<any> = {
        data,
        timestamp: Date.now(),
      };
      this.defaultCache.set(cacheKey, cacheEntry);
    }
  }

  public request<T>(
    method: string,
    url: string,
    params?: AxiosRequestConfig,
    baseConfig?: RequestConfig,
  ): Promise<T | any> {
    const { cacheEnabled = false } = baseConfig || {};
    const cacheKey = `${method}:${url}`;

    if (cacheEnabled) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached !== null) return Promise.resolve(cached);
    }

    return new Promise((resolve, reject) => {
      const config = { method, url, ...params };
      this.axiosInstance
        .request(config)
        .then((response: any) => {
          this.saveCache(cacheEnabled, cacheKey, response.data);
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
    const cacheKey = `post:${url}`;

    if (cacheEnabled) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached !== null) return Promise.resolve(cached);
    }

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(url, data)
        .then((response: any) => {
          this.saveCache(cacheEnabled, cacheKey, response.data);
          resolve(response.data);
        })
        .catch((error) => {
          ElNotification({
            title: "请求失败",
            message: error.response?.data?.describe ?? error.message,
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
    const cacheKey = `get:${url}`;

    if (cacheEnabled) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached !== null) return Promise.resolve(cached);
    }

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url, params)
        .then((response: any) => {
          this.saveCache(cacheEnabled, cacheKey, response.data);
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
}

export const http = new HttpClient();
export const post = http.post.bind(http);
export const get = http.get.bind(http);

export default HttpClient;
