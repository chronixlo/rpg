import { makeAutoObservable } from "mobx";
import type { Dungeon, Item, Player } from "../types";

const TICK_RATE = 100;

class PlayerStore {
  player: Player = {
    maxHealth: 10,
    damageTaken: 0,
    attackInterval: 4,
    lastAttackFrame: 0,
    lastReceivedHit: null,
    stats: [],
  };

  inventorySize = 16;
  inventory: Item[] = [];

  dungeon: Dungeon | null = null;

  constructor() {
    makeAutoObservable(this);

    setInterval(this.tick, TICK_RATE);
  }

  get playerStats() {
    return {
      str: 3,
    };
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
      this.dungeon.enemy.damageTaken >= this.dungeon.enemy.maxHealth
    ) {
      if (this.dungeon.enemy) {
        const item = {
          name: "Dagger",
          stats: [{ type: "str" as const, value: this.dungeon.level }],
        };
        this.inventory.push(item);
        this.dungeon.loot.push(item);
      }

      this.dungeon.enemy = {
        attackInterval: 5,
        damageTaken: 0,
        lastAttackFrame: 0,
        maxHealth: 10,
        stats: [{ type: "str", value: this.dungeon.level }],
        lastReceivedHit: null,
      };
      return;
    }

    if (
      this.player.lastAttackFrame + this.player.attackInterval <
      this.dungeon.frame
    ) {
      const hit = Math.round(Math.random() * this.playerStats.str);

      this.dungeon.enemy.damageTaken += hit;
      this.dungeon.enemy.lastReceivedHit = {
        frame: this.dungeon.frame,
        value: hit,
      };
      this.player.lastAttackFrame = this.dungeon.frame;
    }

    if (
      this.dungeon.enemy.damageTaken < this.dungeon.enemy.maxHealth &&
      this.dungeon.enemy.lastAttackFrame + this.dungeon.enemy.attackInterval <
        this.dungeon.frame
    ) {
      const str = this.dungeon.enemy.stats.find((stat) => stat.type === "str");
      const hit = Math.round(Math.random() * str!.value);

      this.player.damageTaken += hit;
      this.player.lastReceivedHit = { frame: this.dungeon.frame, value: hit };
      this.dungeon.enemy.lastAttackFrame = this.dungeon.frame;
    }

    if (this.player.damageTaken >= this.player.maxHealth) {
      this.dungeon.endedAt = Date.now();
    }
  };
}

const playerStore = new PlayerStore();

export default playerStore;
