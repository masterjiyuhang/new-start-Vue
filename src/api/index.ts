import { http } from "@/utils/http";

export const getAccountListApi = (params: any = {}) => {
  return http.request<any>("get", "/system/getAccountList", { params });
};

// 获取公司列表
export const getCompanyListApi = (params: any = {}) => {
  return http.request<any>("get", "/getCompanyList", { params });
};

/**
 * 获取GitHub用户
 * @param params
 * @returns
 */
export const getGithubUserApi = (params) => {
  return http.request<any>("get", `https://api.github.com/users/${params}`);
};

export const getGithubUserRepoApi = (params) => {
  return http.request<any>(
    "get",
    `https://api.github.com/users/${params}/repos?sort=created`,
  );
};
