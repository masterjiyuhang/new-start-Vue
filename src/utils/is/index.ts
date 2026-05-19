export const isClient = typeof window !== "undefined";

export const rand = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function isType(val: any) {
  if (val === null) return "null";
  if (typeof val !== "object") return typeof val;
  else
    return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}
