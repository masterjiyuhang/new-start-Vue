import { App } from "vue";
import Table from "./cchTable";
import Dialog from "./cchDialog";
import TypeCode from "./cchTypeCode";

export function setupComp(app: App<Element>) {
  app.component(Table.name, Table);
  app.component(Dialog.name, Dialog);
  app.component(TypeCode.name, TypeCode);
}
