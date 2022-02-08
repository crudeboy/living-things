// @ts-ignore
const isValidDate = (d: unknown) => d instanceof Date && !isNaN(d);

export const stringOrNumberToDate = (input: string | number | undefined): Date | undefined => {
  if (typeof input === 'string') {
    const date = new Date(input);
    return isValidDate(date) ? date : new Date();
  }
  if (typeof input === 'number') {
    const date =  new Date(input.toString())
    return isValidDate(date) ? date : new Date();
  }
  return undefined
};

export const dateYearToNumber = (input: Date): number | undefined => {
  if (isValidDate(input)) return input.getFullYear();
  return undefined;
}
export const dateToString = (input: Date): string | undefined => {
  if (isValidDate(input)) return input.toLocaleDateString();
  return undefined;
}