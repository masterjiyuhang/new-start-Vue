import { http } from "@/utils/http";

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
