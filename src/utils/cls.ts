const cls = (values: Array<string | null | undefined | false>) =>
  values.filter(Boolean).join(" ");

export default cls;
