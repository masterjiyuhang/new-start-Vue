import { App, Directive } from "vue";
import copy from "./modules/copy";
import watermark from "./modules/waterMarker";

const directivesList: any = {
  copy,
  watermark,
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((item) => {
      app.directive(
        item,
        (directivesList as { [key: string]: Directive })[item]
      );
    });
  },
};
export default directives;
