import { API_PREFIX } from "@/config";
import { isDev } from "@/utils";
import { http } from "@/utils/http";

// 登录系统接口
export const loginApi = (params: any = {}) => {
  if (isDev()) {
    return http.request<any>("post", `${API_PREFIX}/v1/api/auth/login`, {
      data: params,
    });
  } else {
    return http.request<any>("post", "/v1/api/auth/login", { data: params });
  }
};
