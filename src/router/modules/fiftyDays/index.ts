const iconList = ["Sunrise", "Sunny", "Cloudy", "Ship", "Moon"];

const form = Array.from({ length: 46 }).map((_item, index) => {
  const iconIndex = Math.floor(Math.random() * iconList.length);
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

  map.get(group).children.push(item);

  return map;
}, new Map());

// 将 Map 转换为数组形式
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
  // children: form,
  // children: [
  //   {
  //     path: "/fifty/day01",
  //     name: "FiftyDay01",
  //     component: "/fifty/day01/index",
  //     meta: {
  //       icon: "Stamp",
  //       title: "第一天 卡片展开",
  //       isLink: "",
  //       isHide: false,
  //       isFull: false,
  //       isAffix: false,
  //       isKeepAlive: true,
  //     },
  //   },
  //   {
  //     path: "/fifty/day02",
  //     name: "FiftyDay02",
  //     component: "/fifty/day02/index",
  //     meta: {
  //       icon: "Pear",
  //       title: "第二天 进度展示",
  //       isLink: "",
  //       isHide: false,
  //       isFull: false,
  //       isAffix: false,
  //       isKeepAlive: true,
  //     },
  //   },
  //   {
  //     path: "/fifty/day03",
  //     name: "FiftyDay03",
  //     component: "/fifty/day03/index",
  //     meta: {
  //       icon: "Mug",
  //       title: "第三天 滑动展示",
  //       isLink: "",
  //       isHide: false,
  //       isFull: false,
  //       isAffix: false,
  //       isKeepAlive: true,
  //     },
  //   },
  //   {
  //     path: "/fifty/day04",
  //     name: "FiftyDay04",
  //     component: "/fifty/day04/index",
  //     meta: {
  //       icon: "Mug",
  //       title: "第四天 搜索展示",
  //       isLink: "",
  //       isHide: false,
  //       isFull: false,
  //       isAffix: false,
  //       isKeepAlive: true,
  //     },
  //   },
  // ],
};
