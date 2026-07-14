export const cls = (values: Array<string | null | undefined | false>) =>
  values.filter(Boolean).join(" ");
