import { API_PREFIX } from "@/config";
import { post } from "@/utils/http";

// 登录系统接口
export const loginApi = (params: any = {}) => {
  return post(`${API_PREFIX}/v1/api/auth/login`, params);
};
