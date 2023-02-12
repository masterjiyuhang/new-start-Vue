import { isEqual } from "@pureadmin/utils";
import { defineStore } from "pinia";
import { store } from "..";

export type multiType = {
  path: string;
  parentPath: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
};

export const useTagListsStore = defineStore({
  id: "tagLists",
  state: () => ({
    tagLists: [
      ...[
        {
          path: "/dashboard",
          parentPath: "/",
          meta: {
            title: "首页",
            icon: "homeFilled",
          },
        },
      ],
    ],
  }),
  actions: {
    handleTags<T>(mode: string, value?: T | multiType): T {
      switch (mode) {
        case "push": {
          const tagVal = value as multiType;

          if (tagVal?.meta?.hiddenTag) return;

          if (tagVal?.meta?.title.length === 0) return;

          const tagPath = tagVal.path;

          const tagHasExits = this.tagLists.some((tag) => {
            return tag.path === tagPath;
          });

          // 判断tag中的query键值是否相等
          const tagQueryHasExits = this.tagLists.some((tag: any) => {
            return isEqual(tag?.query, tagVal?.query);
          });

          // 判断tag中的params键值是否相等
          const tagParamsHasExits = this.tagLists.some((tag: any) => {
            return isEqual(tag?.params, tagVal?.params);
          });

          if (tagHasExits && tagQueryHasExits && tagParamsHasExits) return;

          this.tagLists.push(value);
        }
      }
    },
  },
});

export function useTagListsStoreHook() {
  return useTagListsStore(store);
}
