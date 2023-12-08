import { App } from "vue";
import TypeCode from "./cchTypeCode";
import { CountTo } from "./CountTo";

export function setupComp(app: App<Element>) {
  app.component(TypeCode.name, TypeCode);
  app.use(CountTo);
}
