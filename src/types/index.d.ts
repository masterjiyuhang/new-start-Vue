declare module "*.svg?component" {
  import { FunctionalComponent, SVGAttributes } from "vue";
  const src: FunctionalComponent<SVGAttributes>;
  export default src;
}

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type RefType<T> = T | null;

declare type LabelValueOptions = {
  label: string;
  value: any;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = "_self" | "_blank";

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> =
  ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare type ForDataType<T> = {
  [P in T]?: ForDataType<T[P]>;
};

declare type AnyFunction<T> = (...args: any[]) => T;

declare interface Window {
  readonly fn: any;
  readonly BASE_INFO: {
    VUE_APP_BASE_API: string;
  };
}
