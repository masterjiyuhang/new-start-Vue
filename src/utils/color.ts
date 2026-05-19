import { rand } from "@/utils/is";

export const randomColor = (min = 150, max = 200) => {
  const r = rand(min, max);
  const g = rand(min, max);
  const b = rand(min, max);
  return `rgb(${r},${g},${b})`;
};
