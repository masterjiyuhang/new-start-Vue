/*
 * @Author: jiyuhang syjzjyh@163.com
 * @Date: 2023-02-17 16:53:34
 * @LastEditors: jiyuhang syjzjyh@163.com
 * @LastEditTime: 2023-02-17 16:55:25
 * @FilePath: \new-start-Vue\mock\utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ResultEnum } from "./httpEnum";
declare type Recordable<T = any> = Record<string, T>;

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

export function resultSuccess<T = Recordable>(result: T, { message = "ok" }) {
  return {
    code: ResultEnum.SUCCESS,
    result,
    message,
    type: "success",
  };
}

export function resultError(
  message = "Request failed",
  { code = ResultEnum.ERROR, result = null } = {}
) {
  return {
    code,
    result,
    message,
    type: "error",
  };
}

export function pagination<T = any>(
  pageNo: number,
  pageSize: number,
  array: T[]
): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize));
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = "ok" } = {}
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess(
      {
        items: pageData,
        total: list.length,
      },
      {}
    ),
    message,
  };
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({
  headers,
}: requestParams): string | undefined {
  return headers?.authorization;
}
