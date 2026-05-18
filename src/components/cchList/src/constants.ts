import type { InjectionKey } from "vue";

export interface ListProvide {
  col: number;
}

export const ListKey: InjectionKey<ListProvide> = Symbol("ListKey");
