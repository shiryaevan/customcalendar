export const cn = (classNames: (string | false)[]) => {
  const resultArray: string[] = [];

  classNames.map((i) => !!i && resultArray.push(i));

  return resultArray.join(" ");
};

export const times = (
  count: number,
  callback: (i: any, index: number) => void
) => {
  [...Array(count)].map((i, index) => callback(i, index));
};
