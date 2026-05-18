import { MockMethod } from "vite-plugin-mock";
import { routerList, authButtonList } from "../_constant";
import { resultPageSuccess, resultSuccess } from "../_utils";

const accountList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      account: `user_${index}`,
    });
  }
  return result;
})();

const companyList = (() => {
  const res: any[] = [];
  for (let index = 0; index < 30; index++) {
    res.push({
      name: `公司_${index}`,
      enName: `company_${index}`,
      company: `企业${index}号`,
    });
  }
  return res;
})();

export default [
  {
    url: "/basic-api/system/getRouterList",
    timeout: 200,
    method: "get",
    response: () => {
      return resultSuccess(routerList.data);
    },
  },
  {
    url: "/basic-api/system/authButtonList",
    timeout: 200,
    method: "get",
    response: () => {
      return resultSuccess(authButtonList.data);
    },
  },
  {
    url: "/basic-api/system/getAccountList",
    timeout: 100,
    method: "get",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, accountList);
    },
  },
  {
    url: "/basic-api/system/getCompanyList",
    timeout: 2000,
    method: "get",
    response: () => {
      return resultSuccess(companyList);
    },
  },
  {
    url: "/basic-api/system/getDashboardList",
    method: "post",
    response: () => {
      return resultSuccess({
        todayVisits: Math.floor(Math.random() * 90) + 10,
        yesterdayVisits: Math.floor(Math.random() * 4000) + 1000,
        newUsers: Math.floor(Math.random() * 90) + 10,
        activeUsers: Math.floor(Math.random() * 9900) + 100,
        totalNumbers: Math.floor(Math.random() * 19) + 1,
        pieData: [
          { value: Math.floor(Math.random() * 5000) + 5000, name: "Gitee 访问量" },
          { value: Math.floor(Math.random() * 5000) + 5000, name: "GitHub 访问量" },
        ],
      });
    },
  },
] as MockMethod[];
