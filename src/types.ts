export type Stat = {
  value: number;
  type: "str";
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
  enemy: Enemy | null;
  loot: Item[];
};

export interface Unit {
  maxHealth: number;
  damageTaken: number;
  attackInterval: number;
  lastAttackFrame: number;
  stats: Stat[];
  lastReceivedHit: {
    frame: number;
    value: number;
  } | null;
}

export type Enemy = Unit;

export type Player = Unit;
