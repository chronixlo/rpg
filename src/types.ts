import type { Unit } from "./stores/Unit";

export const STAT_TYPES = {
  str: "str",
  hp: "hp",
  def: "def",
} as const;

export type StatType = (typeof STAT_TYPES)[keyof typeof STAT_TYPES];

export type BaseStats = {
  str: number;
  hp: number;
  def: number;
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
  [K in EquipmentType]: Item;
};

export const ITEM_TYPES = {
  material: "material",
  ...EQUIPMENT_TYPES,
} as const;

export type ItemType = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];

export const RARITIES = {
  common: "common",
  uncommon: "uncommon",
  rare: "rare",
  epic: "epic",
  legendary: "legendary",
} as const;

export type Rarity = (typeof RARITIES)[keyof typeof RARITIES];

export const RARITY_COLORS = {
  common: "#fff",
  uncommon: "#2d3",
  rare: "#12d",
  epic: "#d3c",
  legendary: "#dc2",
};

export const RARITY_MULTIPLIERS = {
  common: 0,
  uncommon: 1,
  rare: 1.3,
  epic: 1.5,
  legendary: 2,
};

export type Item = {
  id: number;
  level?: number;
  name: string;
  stats: Stat[];
  type: ItemType;
  icon: string;
  rarity: Rarity;
  count?: number;
};

export type Dungeon = {
  frame: number;
  startedAt: number;
  endedAt: number | null;
  level: number;
  enemy: Unit | null;
  loot: Item[];
};
