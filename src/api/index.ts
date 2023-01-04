import { http } from "@/utils/http";

interface RECORDS {
  id: string;
  countryNameCn: string;
}
type Result = {
  success: boolean;
  data: {
    records: Array<any>;
    /** 列表数据 */
    list?: Array<any>;
  };
};

export const getCountryListApi = (data?: object) => {
  return http.request<Result>("post", "/system/dms/anon/country/findAllList", {
    data: data ?? {},
  });
};

export const submitRegistrationAPi = (data?: object) => {
  return http.request<Result>("post", "/collect/fr/questionnaire/submit", {
    data,
  });
};
