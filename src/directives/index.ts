import { App, Directive } from "vue";
import copy from "./modules/copy";
import watermark from "./modules/waterMarker";
import throttle from "./modules/throttle";
import debounce from "./modules/debounce";
import RippleDirective from "./modules/ripper/index";

const directivesList: any = {
  copy,
  watermark,
  throttle,
  debounce,
  RippleDirective,
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
