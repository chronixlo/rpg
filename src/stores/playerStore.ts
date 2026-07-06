import { makeAutoObservable } from "mobx";
import type { Dungeon, Item } from "../types";
import { Unit } from "./Unit";

const TICK_RATE = 100;

class PlayerStore {
  player = new Unit();

  inventorySize = 16;
  inventory: Item[] = [];

  dungeon: Dungeon | null = null;

  constructor() {
    makeAutoObservable(this);

    setInterval(this.tick, TICK_RATE);
  }

  startDungeon() {
    this.player.lastAttackFrame = 0;

    this.dungeon = {
      frame: 0,
      startedAt: Date.now(),
      endedAt: null,
      enemy: null,
      level: 1,
      loot: [],
    };
  }

  discardDungeon() {
    if (!this.dungeon) {
      return;
    }
    this.inventory.push(...this.dungeon.loot);
    this.dungeon = null;
  }

  tick = () => {
    if (this.dungeon?.endedAt) {
      return;
    }
    if (!this.dungeon) {
      if (this.player.damageTaken > 0) {
        this.player.damageTaken--;
      }
      return;
    }

    this.dungeon.frame++;

    if (
      !this.dungeon.enemy ||
      this.dungeon.enemy.damageTaken >= this.dungeon.enemy.baseStats.hp
    ) {
      if (this.dungeon.enemy) {
        const item = {
          name: "Dagger",
          stats: [{ type: "str" as const, value: this.dungeon.level }],
        };
        this.dungeon.loot.push(item);
      }

      this.dungeon.enemy = new Unit({
        attackInterval: 5,
        baseStats: { str: this.dungeon.level, hp: 10 },
      });
      return;
    }

    if (
      this.player.lastAttackFrame + this.player.attackInterval <
      this.dungeon.frame
    ) {
      const hit = Math.round(Math.random() * this.player.resolvedStats.str);

      this.dungeon.enemy.damageTaken += hit;
      this.dungeon.enemy.lastReceivedHit = {
        frame: this.dungeon.frame,
        value: hit,
      };
      this.player.lastAttackFrame = this.dungeon.frame;
    }

    if (
      this.dungeon.enemy.damageTaken < this.dungeon.enemy.baseStats.hp &&
      this.dungeon.enemy.lastAttackFrame + this.dungeon.enemy.attackInterval <
        this.dungeon.frame
    ) {
      const str = this.dungeon.enemy.baseStats.str;
      const hit = Math.round(Math.random() * str);

      this.player.damageTaken += hit;
      this.player.lastReceivedHit = { frame: this.dungeon.frame, value: hit };
      this.dungeon.enemy.lastAttackFrame = this.dungeon.frame;
    }

    if (this.player.damageTaken >= this.player.resolvedStats.hp) {
      this.dungeon.endedAt = Date.now();
    }
  };
}

const playerStore = new PlayerStore();

export default playerStore;
