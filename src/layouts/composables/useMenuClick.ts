import { useRouter } from "vue-router";

export function useMenuClick() {
  const router = useRouter();

  const handleClickMenu = (subItem: Menu.MenuOptions) => {
    if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
    router.push(subItem.path);
  };

  return { handleClickMenu };
}
