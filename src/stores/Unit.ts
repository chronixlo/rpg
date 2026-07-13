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
    head: null,
    chest: null,
    gloves: null,
    boots: null,
    weapon: null,
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
