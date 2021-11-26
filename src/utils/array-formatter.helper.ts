export const arrayToList = (array: string[]): string =>
  array
    .map((w) => `'${w}'`)
    .join(', ')
    .replace(/, ((?:.(?!, ))+)$/, ' and $1');
