import { makeAutoObservable } from "mobx";

export class Unit {
  damageTaken = 0;
  attackInterval = 4;
  lastAttackFrame = 0;
  lastReceivedHit: { value: number; frame: number } | null = null;
  baseStats = {
    str: 1,
    hp: 10,
  };

  constructor(options?: Partial<Unit>) {
    makeAutoObservable(this);

    Object.assign(this, options);
  }

  get resolvedStats() {
    return {
      str: this.baseStats.str,
      hp: this.baseStats.hp,
    };
  }
}
