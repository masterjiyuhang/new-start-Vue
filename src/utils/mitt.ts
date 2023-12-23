import type { Emitter } from "mitt";
import mitt from "mitt";

type Events = {
  logoChange: boolean;
  closeThisPage: {};
  changeSidebarCollapse: {};

  // 刷新当前页面
  refreshCurrentPage: boolean;

  openThemeDrawer: void;
};

export const emitter: Emitter<Events> = mitt<Events>();

export const setRefreshCurrentPage = () =>
  emitter.emit("refreshCurrentPage", true);
export const removeRefreshCurrentPage = () =>
  emitter.emit("refreshCurrentPage", false);
