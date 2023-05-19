export function isUndefined(val: any): boolean {
  return val === undefined;
}

export function toArray<T>(list: T[], start?: number): T[] {
  start = start || 0;
  let i = list.length - start;
  const ret = new Array(i);
  while (i--) {
    // eslint-disable-line
    ret[i] = list[i + start];
  }
  return ret;
}

export function isFunction(value: any): boolean {
  return Object.prototype.toString.call(value) === "[object Function]";
}

export function getParams(params: any, config: any): any {
  if (!config.isRemoveField) {
    return params;
  }
  return removeEmptyField(params, config.removeField);
}

export function removeEmptyField(
  params: any = {},
  removeField: string[] = []
): any {
  const copyParams = JSON.parse(JSON.stringify(params));
  let arrField = removeField;
  if (removeField.length === 0) {
    arrField = Object.keys(params);
  }
  arrField.forEach((key) => {
    const val = copyParams[key];
    if (val === "" || val === undefined || val === null) {
      delete copyParams[key];
    }
  });
  return copyParams;
}


export function getUrl(url: string, baseURL?: string): string {
  if (!baseURL) {
    return url;
  }
  const arr: string[] = [baseURL];
  arr.push(url);
  return arr.join('');
}
