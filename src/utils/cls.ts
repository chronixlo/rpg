const cls = (values: Array<string | null | false>) =>
  values.filter(Boolean).join(" ");

export default cls;
