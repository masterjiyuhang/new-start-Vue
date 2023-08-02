import { App } from "vue";
import Table from "./cchTable";
import Dialog from "./cchDialog";
import TypeCode from "./cchTypeCode";
import { CountTo } from "./CountTo";
import { List, ListItem } from "./cchList";

export function setupComp(app: App<Element>) {
  app.component(Table.name, Table);
  app.component(Dialog.name, Dialog);
  app.component(TypeCode.name, TypeCode);
  app.component(List.name || "CchList", List);
  app.component(ListItem.name || "CchListItem", ListItem);
  app.use(CountTo);
}
