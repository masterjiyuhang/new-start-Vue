const iconList = ["Sunrise", "Sunny", "Cloudy", "Ship", "Moon"];

const form = Array.from({ length: 11 }).map((_item, index) => {
  const iconIndex = Math.floor(Math.random() * iconList.length);
  return {
    path: `/fifty/day${index + 1}`,
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

// console.log(form);
form.map((item, index) => {
  const group = `group${Math.ceil((index + 1) / 10)}`;
});
// const group = `group${Math.ceil((index + 1) / 10)}`;
// const redirectPath = `/fifty/${group}/day${index < 9 ? "0" + (index + 1) : index + 1}/index`;

// console.log(group, redirectPath);
