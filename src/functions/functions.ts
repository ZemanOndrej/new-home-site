// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Temp = { [path: string]: any };
export function flatten(obj: Temp, startingPath = '', baseObj = {}): Temp {
  const initString = startingPath ? startingPath + '.' : '';

  return Object.keys(obj).reduce((acc: Temp, curr) => {
    const path = `${initString}${curr}`;
    // if (Array.isArray(obj[curr])) {
    //   const arr = obj[curr].map((o: Temp) => flatten(o, '', {}));
    //   acc[curr] = arr;
    // } else
    if (typeof obj[curr] === 'object') {
      flatten(obj[curr], path, baseObj);
    } else {
      acc[path] = obj[curr];
    }
    return acc;
  }, baseObj);
}

export function unflatten(obj: Temp): Temp {
  const keys = Object.keys(obj);
  return keys.reduce((acc: Temp, key) => {
    const splitted = key.split('.');
    let acc_tmp = acc;
    splitted.forEach((attKey, i) => {
      if (!acc_tmp[attKey] && i < splitted.length - 1) {
        acc_tmp[attKey] = {};
        acc_tmp = acc_tmp[attKey];
      } else if (!acc_tmp[attKey]) {
        acc_tmp[attKey] = obj[key];
      } else {
        acc_tmp = acc_tmp[attKey];
      }
    });
    return acc;
  }, {});
}
