import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../_utils";

export default [
  {
    url: "/basic-api/system/getDashboardList",
    // timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        "todayVisits|10-100": 0,
        "yesterdayVisits|1000-5000": 0,
        "newUsers|10-100": 0,
        "activeUsers|100-10000": 0,
        pieData: [
          { "value|5000-10000": 0, name: "Gitee 访问量" },
          { "value|5000-10000": 0, name: "GitHub 访问量" },
        ],
      });
    },
  },
] as MockMethod[];
