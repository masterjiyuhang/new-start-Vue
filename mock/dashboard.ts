import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "./utils";

export default [
  {
    url: "/basic-api/system/getDashboardList",
    timeout: 100,
    method: "get",
    response: () => {
      return resultSuccess({
        "todayVisits|10-100": 0,
        "yesterdayVisits|1000-5000": 0,
      });
    },
  },
] as MockMethod[];
