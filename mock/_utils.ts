import { App, Component } from "vue";
import { ResultEnum } from "./_httpEnum";
declare type Recordable<T = any> = Record<string, T>;

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

export function resultSuccess<T = Recordable>(
  data: T,
  { message = "ok" } = {}
) {
  return {
    code: ResultEnum.SUCCESS,
    data,
    message,
    type: "success",
  };
}

export function resultError(
  message = "Request failed",
  { code = ResultEnum.ERROR, data = null } = {}
) {
  return {
    code,
    data,
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

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export type CustomComponent = Component & { displayName?: string };

export const withInstall = <T extends CustomComponent>(
  component: T,
  alias?: string
) => {
  (component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as WithInstall<T>;
};
