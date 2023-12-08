import { MockMethod } from "vite-plugin-mock";
import { routerList, authButtonList } from "../_constant";
import { resultPageSuccess, resultSuccess } from "../_utils";

const accountList = (() => {
  const result: any[] = [];

  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      account: "@first",
    });
  }

  return result;
})();

const companyList = (() => {
  const res: any[] = [];
  for (let index = 0; index < 30; index++) {
    res.push({
      name: "@cname",
      enName: "@name",
      company: "@ctitle",
    });
  }

  return res;
})();

export default [
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
    url: "/basic-api/getCompanyList",
    timeout: 2000,
    method: "get",
    response: () => {
      return resultSuccess(companyList);
    },
  },
  {
    url: "/basic-api/getRouterList",
    timeout: 200,
    method: "get",
    response: () => {
      return resultSuccess(routerList.data);
    },
  },
  {
    url: "/basic-api/authButtonList",
    timeout: 200,
    method: "get",
    response: () => {
      return resultSuccess(authButtonList.data);
    },
  },
  {
    url: "/basic-api/login",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess({
        access_token: "@uuid",
        user_id: "@id",
      });
    },
  },
  {
    url: "/basic-api/logout",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess({ success: true });
    },
  },
] as MockMethod[];
