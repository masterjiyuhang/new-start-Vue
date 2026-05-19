const HEX_REGEX = /^#?[0-9A-Fa-f]{6}$/;

export function hexToRgb(str: string): number[] | null {
  if (!HEX_REGEX.test(str)) return null;
  str = str.replace("#", "");
  const hexs = str.match(/../g);
  if (!hexs) return null;
  return hexs.map((h) => parseInt(h, 16));
}

export function rgbToHex(r: number, g: number, b: number): string | null {
  const reg = /^\d{1,3}$/;
  if (!reg.test(String(r)) || !reg.test(String(g)) || !reg.test(String(b)))
    return null;
  const hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
  return `#${hexs.join("")}`;
}

export function getLightColor(color: string, level: number): string | null {
  if (!HEX_REGEX.test(color)) return null;
  const rgb = hexToRgb(color);
  if (!rgb) return null;
  for (let i = 0; i < 3; i++)
    rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

export function getDarkColor(color: string, level: number): string | null {
  if (!HEX_REGEX.test(color)) return null;
  const rgb = hexToRgb(color);
  if (!rgb) return null;
  for (let i = 0; i < 3; i++)
    rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
