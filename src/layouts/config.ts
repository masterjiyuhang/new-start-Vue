import { LayoutType } from "@/stores/interface";

export const LAYOUT_CONFIG = {
  appName: "CchAdmin",

  defaultUserName: "erhang",

  footerStartYear: 2022,

  responsiveBreakpoint: 1200,

  layoutTypes: ["vertical", "classic", "transverse", "columns"] as LayoutType[],

  sidebarColors: {
    dark: { bg: "#191a20", text: "#bdbdc0", active: "#060708" },
    light: { bg: "#ffffff", text: "#303133", active: "#ffffff" },
  },
};
