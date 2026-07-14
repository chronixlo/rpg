import { makeAutoObservable } from "mobx";
import { type Equipment, type Item } from "../types";

export class Unit {
  damageTaken = 0;
  attackInterval = 4;
  lastAttackFrame = 0;
  lastReceivedHit: { value: number; frame: number } | null = null;
  baseStats = {
    str: 1,
    hp: 10,
    def: 1,
  };
  equipment: Equipment = {
    head: {
      id: -1,
      name: "Rusty Helmet",
      stats: [],
      type: "head",
      icon: "items/head/closed-barbute.svg",
      rarity: "common",
    },
    chest: {
      id: -2,
      name: "Tattered Tunic",
      stats: [],
      type: "chest",
      icon: "items/chest/shoulder-armor.svg",
      rarity: "common",
    },
    gloves: {
      id: -3,
      name: "Worn Gloves",
      stats: [],
      type: "gloves",
      icon: "items/gloves/mailed-fist.svg",
      rarity: "common",
    },
    boots: {
      id: -4,
      name: "Old Boots",
      stats: [],
      type: "boots",
      icon: "items/boots/metal-boot.svg",
      rarity: "common",
    },
    weapon: {
      id: -5,
      name: "Rusty Dagger",
      stats: [],
      type: "weapon",
      icon: "items/weapon/sacrificial-dagger.svg",
      rarity: "common",
    },
  };
  icon: string | null = null;
  name: string = "";

  constructor(options?: Partial<Unit>) {
    makeAutoObservable(this);

    Object.assign(this, options);
  }

  get resolvedStats() {
    const equipmentStats = (
      Object.values(this.equipment).filter(Boolean) as Item[]
    ).flatMap((item) => item.stats);

    const stats = { ...this.baseStats };

    equipmentStats.forEach((stat) => {
      if (!stats[stat.type]) {
        stats[stat.type] = 0;
      }
      stats[stat.type] += stat.value;
    });

    return stats;
  }

  calcHit = (target: Unit) => {
    const isSuccessfulHit = Math.random() > target.resolvedStats.def / 100;

    if (!isSuccessfulHit) {
      return 0;
    }

    return Math.round(Math.random() * this.resolvedStats.str);
  };
}
