export const PAGE_NOT_FOUND_ROUTE = {
  path: "/:path(.*)*",
  name: "PageNotFound",
  component: () => import("@/views/error/404.vue"),
  meta: {
    title: "404 page.",
    isMenu: false,
    icon: "",
  },
};
