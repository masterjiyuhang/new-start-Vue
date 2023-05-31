/**
 * request 默认配置
 */
export default {
  // url 前缀
  baseURL: "/basic-api",
  /**
   * axios 配置
   * @see https://github.com/mzabriskie/axios
   */
  axiosConfig: {
    timeout: 20000,
    withCredentials: true,
    baseURL: "",
  },
  // 默认错误提示消息 400 500 走的默认提示 如果没有或者 undefined 则不提示
  errorMsg: {
    title: "操作提示",
    message: "网络异常, 请刷新重试",
  },
  /**
   *
   * 处理响应返回值
   * @param {*} data
   * @returns
   */
  transformResponse(data) {
    return data;
  },
  // request config
  requestConfig: {
    // 是否自动处理 弹框消息
    isAutoMsg: true,
    // 自动loading
    isLoading: true,
    // loading 配置
    loadingConfig: {
      text: "努力加载中...",
      // Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；
      // 若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点默认是 document.body
      target: undefined,
    },
    // 如果参数是空值是不传
    isRemoveField: true,
    // 和 isRemoveField 一起使用
    removeField: [],

    // 接口缓存过期时间
    maxCacheAge: 5 * 60 * 1000,
  },
};
