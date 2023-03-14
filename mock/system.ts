import { MockMethod } from "vite-plugin-mock";
import { resultPageSuccess, resultSuccess } from "./utils";

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
] as MockMethod[];
