import { InputObject } from 'components/Sidebar/SidebarContainer';

export type Temp = Record<string, unknown>;
export function flatten(obj: Temp, startingPath = '', baseObj = {}): Temp {
  const initString = startingPath ? startingPath + '.' : '';

  return Object.keys(obj).reduce((acc: Temp, curr) => {
    const path = `${initString}${curr}`;
    if (Array.isArray(obj[curr])) {
      const arr = (obj[curr] as Temp[]).map((o: Temp) => flatten(o, '', {}));
      acc[path] = arr;
    } else if (typeof obj[curr] === 'object') {
      flatten(obj[curr] as Temp, path, baseObj);
    } else {
      acc[path] = obj[curr];
    }
    return acc;
  }, baseObj);
}

export function unflatten(obj: Temp, startingPath = ''): Temp {
  const keys = Object.keys(obj);
  return keys.reduce((acc: Temp, key) => {
    const splitted = key.replace(startingPath, '').split('.').filter(Boolean);
    const arr =
      Array.isArray(obj[key]) &&
      (obj[key] as Temp[])
        .map((item: Temp) => unflatten(item, key))
        .filter(Boolean);

    let acc_tmp: Temp = acc;
    splitted.forEach((attKey, i) => {
      if (!acc_tmp[attKey] && i < splitted.length - 1) {
        acc_tmp[attKey] = {};
        acc_tmp = acc_tmp[attKey] as Temp;
      } else if (!acc_tmp[attKey]) {
        acc_tmp[attKey] = arr || obj[key];
      } else {
        acc_tmp = acc_tmp[attKey] as Temp;
      }
    });
    return acc;
  }, {});
}

export function hashCode(str: string): number {
  let hash = 0,
    i = 0;
  const len = str.length;
  while (i < len) {
    hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
  }
  return hash;
}
export function inputGroupValuesToString(
  textInputs: InputObject[],
  index: number,
): string {
  const vals = Object.values(textInputs[index] ?? {});
  return vals.filter((v) => !['object', 'function'].includes(typeof v)).join();
}
