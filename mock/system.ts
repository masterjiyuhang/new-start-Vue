import { MockMethod } from "vite-plugin-mock";
import { resultPageSuccess } from "./utils";

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
] as MockMethod[];
