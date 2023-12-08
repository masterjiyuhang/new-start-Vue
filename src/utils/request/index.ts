import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import BaseAxiosConfig from "./src/config";
import { merge } from "lodash";
import {
  requestResolve,
  requestReject,
  responseReject,
  responseResolve,
} from "./src/interceptors";
// import { getParams, getUrl } from "./src/utils";
// import { ElLoading, ElNotification } from "element-plus";
import LRUCache from "lru-cache";
import NProgress from "../progress";
import { autoMessageAdapter } from "./src/utils";

/**
 * 自定义请求配置
 */
type SelfRequestConfig = {
  /**
   * 是否开启缓存
   */
  cacheConfig?: {
    enabled?: boolean; // 是否开启缓存
    forceUpdate?: boolean; // 是否强制更新缓存
    forceCache?: boolean; // 是否强制启用缓存
  };

  /**
   * 是否开启截流
   */
  throttleConfig?: {
    enabled?: boolean;
    threshold?: number;
  };
};

class HttpRequest {
  private options: any;
  private initializedPlugins: any;
  public axiosInstance!: AxiosInstance;
  private lruCache!: LRUCache<string, any>;

  constructor(options: any) {
    if (BaseAxiosConfig.baseURL) {
      BaseAxiosConfig.axiosConfig.baseURL = BaseAxiosConfig.baseURL;
    }

    // 合并options选项
    this.init(options);

    // 创建axios实例
    this.axiosInstance = axios.create(this.options.axiosConfig);

    this.initGlobalApi();

    this.initAxios(this.axiosInstance);
  }

  private init(options: any): void {
    this.options = merge({}, BaseAxiosConfig, options);
    this.lruCache = new LRUCache({
      ttl: this.options.maxCacheAge || 1000 * 60 * 5,
      max: 200,
    });
  }

  // 向options上挂载一些通用方法
  private initGlobalApi(): void {
    this.options.$message = (response, isReject = false) => {
      if (isReject) {
        // ElNotification({
        //   title: "Warning",
        //   message: response.message,
        //   type: "warning",
        // });
        return;
      }

      const { data } = response;
      // ElNotification({
      //   title: "Error",
      //   message: data?.message,
      //   type: "error",
      // });
    };

    // this.options.$loading = ElLoading.service;
    this.options.$autoMessageAdapter = autoMessageAdapter;
  }

  // 初始化 axios 实例，添加请求和响应拦截器
  private initAxios(service: AxiosInstance): void {
    const LOADING = {
      // 存储执行 loading 的请求队列
      loadings: [],
      // 是否正在加载 loading
      isLoading: false,
      // loading 加载实例 用于清除loading
      $loading: null,
    };
    const options = {
      LOADING,
      ...this.options,
    };

    // 请求拦截器
    service.interceptors.request.use(
      (config) => {
        return requestResolve({ options, value: config });
      },
      (error) => {
        return requestReject({ options, value: error });
      }
    );

    // 响应拦截器
    service.interceptors.response.use(
      (response) => {
        return responseResolve({ options, value: response });
      },
      (error) => {
        return responseReject({ options, value: error });
      }
    );
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
    config?: AxiosRequestConfig & SelfRequestConfig
  ): Promise<T | any> {
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance
        .request<T>({
          method,
          url,
          ...config,
        })
        .then((response) => {
          // Cache the response if cacheEnabled is true
          if (config?.cacheConfig?.enabled) {
            this.lruCache?.set(`${method}_${url}`, response);
          }
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

  public use(plugin) {
    const installedPlugins =
      this.initializedPlugins || (this.initializedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
  }

  public request<T>(
    method: string,
    url: string,
    config: AxiosRequestConfig & SelfRequestConfig
  ): Promise<T | any> {
    const { cacheConfig } = config;
    const requestConfig = this.options.requestConfig || {};
    const opts = { ...requestConfig, ...config };

    // 接口缓存逻辑
    if (
      (cacheConfig?.enabled && method === "get") ||
      (cacheConfig?.forceCache && cacheConfig?.enabled)
    ) {
      NProgress.start();
      const index = `${method}_${url}`;
      const responsePromise = this.lruCache.get(index);

      // 没有缓存数据或配置强制更新缓存
      if (!responsePromise || cacheConfig.forceUpdate) {
        return this.makeRequest(method, url, opts);
      } else {
        // 命中缓存 直接返回缓存的接口结果
        NProgress.done();
        return responsePromise;
      }
    }

    // 没有开启接口缓存逻辑 默认发送请求
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<T>({ method, url, ...opts })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          const wrapperError = new Error(
            `Request failed for ${url}, error is ${error}`
          );
          reject(wrapperError);
        })
        .finally(() => {});
    });
  }

  // public get(url: string, params = {}, config?: AxiosRequestConfig) {
  //   const requestConfig = this.options.requestConfig || {};
  //   const opts = { ...requestConfig, ...config };
  //   opts.params = getParams(params, opts);
  //   return this.axiosInstance.get(url, opts);
  // }

  // public download(url, params = {}, type = "post", config = {}) {
  //   const requestConfig = this.options.requestConfig || {};
  //   const opts = { ...requestConfig, ...config };
  //   const downloadForm = document.createElement("form");
  //   downloadForm.setAttribute("method", type);
  //   downloadForm.setAttribute("hidden", "hidden");
  //   downloadForm.setAttribute("action", getUrl(url, opts.isApiHost));

  //   const createInput = (name, value) => {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "hidden");
  //     input.setAttribute("name", name);
  //     input.setAttribute("value", value);

  //     downloadForm.appendChild(input);
  //   };

  //   Object.keys(params).forEach((key) => {
  //     createInput(key, params[key]);
  //   });

  //   const $body = document.body || document.getElementsByTagName("body")[0];
  //   $body.appendChild(downloadForm);
  //   downloadForm.submit();
  //   downloadForm.remove();
  //   $body.removeChild(downloadForm);
  // }
}

export default HttpRequest;
