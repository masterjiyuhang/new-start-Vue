import type { Emitter } from "mitt";
import mitt from "mitt";

type Events = {
  resize: {
    detail: {
      width: number;
      height: number;
    };
  };
  openPanel: string;
  tagViewsChange: string;
  tagViewsShowModel: string;
  logoChange: boolean;
  changLayoutRoute: {
    indexPath: string;
    parentPath: string;
  };
  changeCurrentRoute: {
    routeInfo: any;
    parentPath: string;
  };

  setKeepAlive: {};
  closeThisPage: {};
  closeAllPage: {};
  mobile: {};
  collapse: {};

  changeSidebarCollapse: {};

  // 刷新当前页面
  refreshCurrentPage: boolean;
};

export const emitter: Emitter<Events> = mitt<Events>();
