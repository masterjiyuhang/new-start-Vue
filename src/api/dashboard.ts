import { http } from "@/utils/http";

export const getDashboardListApi = (
  params: any = {
    name: "erhang",
  }
) => {
  return http.request<any>("post", "/system/getDashboardList", {
    data: params,
  });
};
