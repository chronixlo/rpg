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

export const EQUIPMENT_TYPES = {
  head: "head",
  chest: "chest",
  gloves: "gloves",
  boots: "boots",
  weapon: "weapon",
} as const;

export type EquipmentType =
  (typeof EQUIPMENT_TYPES)[keyof typeof EQUIPMENT_TYPES];

export type Equipment = {
  [K in EquipmentType]: Item | null;
};

export const ITEM_TYPES = {
  material: "material",
  ...EQUIPMENT_TYPES,
} as const;

export type ItemType = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];

export type Item = {
  id: number;
  name: string;
  stats: Stat[];
  type: ItemType;
};

export type Dungeon = {
  frame: number;
  startedAt: number;
  endedAt: number | null;
  level: number;
  enemy: Unit | null;
  loot: Item[];
};
