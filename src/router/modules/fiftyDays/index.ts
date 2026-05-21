const iconList = ["Sunrise", "Sunny", "Cloudy", "Ship", "Moon"] as const;

const form: Menu.MenuOptions[] = Array.from({ length: 50 }).map((_item, index) => {
  const iconIndex = index % iconList.length;
  const groupNumber = Math.ceil((index + 1) / 10);
  const group = `group${groupNumber}`;
  return {
    path: `/fifty/${group}/day${index + 1}`,
    name: `FiftyDay${index + 1}`,
    component: `/fifty/day${index < 9 ? "0" + (index + 1) : index + 1}/index`,
    meta: {
      icon: iconList[iconIndex],
      title: `第${index + 1}天`,
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true,
    },
  };
});

const mapLL = form.reduce((map, item, index) => {
  const groupNumber = Math.ceil((index + 1) / 10);
  const group = `group${groupNumber}`;

  if (!map.has(group)) {
    map.set(group, {
      path: `/fifty/${group}`,
      name: `${group.toUpperCase()}`,
      redirect: `/fifty/${group}/day${(groupNumber - 1) * 10 + 1}`,
      meta: {
        icon: "Stamp",
        title: `第${groupNumber}组`,
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
      children: [],
    });
  }

  map.get(group)!.children!.push(item);

  return map;
}, new Map<string, Menu.MenuOptions>());

const groupedRoutes = Array.from(mapLL.values());

export default {
  path: "/fifty",
  name: "FiftyDays",
  redirect: "/fifty/day01",
  meta: {
    icon: "Apple",
    title: "五十天",
    isLink: "",
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },
  children: groupedRoutes,
} satisfies Menu.MenuOptions;
