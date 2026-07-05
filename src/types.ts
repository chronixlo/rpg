export type Stat = {
  value: number;
  type: "str";
};

export type Item = {
  name: string;
  stats: Stat[];
};
