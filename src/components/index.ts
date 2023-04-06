import { App } from "vue";
import Table from "./cchTable";
import Dialog from "./cchDialog"

export function setupComp(app: App<Element>) {
  app.component(Table.name, Table);
  app.component(Dialog.name, Dialog);
}
