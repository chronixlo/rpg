export const cls = (values: Array<string | null | undefined | false>) =>
  values.filter(Boolean).join(" ");

export const randomFromArray = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)];
