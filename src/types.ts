import type { Unit } from "./stores/Unit";

export const STAT_TYPES = {
  str: "str",
  hp: "hp",
} as const;

export type StatType = (typeof STAT_TYPES)[keyof typeof STAT_TYPES];

export type BaseStats = {
  str: number;
  hp: number;
};

export type Stat = {
  value: number;
  type: StatType;
};

export type Item = {
  name: string;
  stats: Stat[];
};

export type Dungeon = {
  frame: number;
  startedAt: number;
  endedAt: number | null;
  level: number;
  enemy: Unit | null;
  loot: Item[];
};
