export const getAllBreadcrumbList = (
  menuList: Menu.MenuOptions[],
  result: { [key: string]: any } = {},
  parent: Menu.MenuOptions[] = []
) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    if (item.children)
      getAllBreadcrumbList(item.children, result, result[item.path]);
  }
  return result;
};

export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

export function getTimeState() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

export function getBrowserLang() {
  const browserLang = navigator.language
    ? navigator.language
    : (navigator as any).browserLanguage;
  let defaultBrowserLang = "";
  if (
    browserLang.toLowerCase() === "cn" ||
    browserLang.toLowerCase() === "zh" ||
    browserLang.toLowerCase() === "zh-cn"
  ) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}
