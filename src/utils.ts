import type { Stat, StatType } from "./types";

export const cls = (values: Array<string | null | undefined | false>) =>
  values.filter(Boolean).join(" ");

export const randomFromArray = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)];

export const distributeStats = (statTypes: StatType[], count: number) => {
  let statsToAllocate = count;

  const stats: Stat[] = [];

  statTypes.forEach((stat, index, array) => {
    let value;

    if (index === array.length - 1) {
      value = statsToAllocate;
    } else {
      value = Math.round(Math.random() * statsToAllocate);
    }

    stats.push({
      type: stat,
      value,
    });

    statsToAllocate -= value;
  });

  return stats;
};
