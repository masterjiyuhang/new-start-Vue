export function getFlatArr(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce(
    (pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
      let flatArr = [...pre, current];
      if (current.children)
        flatArr = [...flatArr, ...getFlatArr(current.children)];
      return flatArr;
    },
    []
  );
}
