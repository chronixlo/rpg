import { makeAutoObservable } from "mobx";
import { type Dungeon, type EquipmentType, type Item } from "../types";
import { Unit } from "./Unit";
import { getRandomItem } from "../itemGenerator";

const TICK_RATE = 10;

class PlayerStore {
  player = new Unit({ name: "Hero", icon: "hero.svg" });

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

  equipItem = (item: Item) => {
    const oldEquipped = this.player.equipment[item.type as EquipmentType];
    this.player.equipment[item.type as EquipmentType] = item;

    const index = this.inventory.findIndex((i) => i.id === item.id);
    this.inventory.splice(index, 1);

    if (oldEquipped) {
      this.inventory.push(oldEquipped);
    }
  };

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
        const item = getRandomItem(this.dungeon.level);
        this.dungeon.loot.push(item);
      }

      this.dungeon.enemy = new Unit({
        attackInterval: 5,
        baseStats: { str: this.dungeon.level, hp: 10, def: this.dungeon.level },
        name: "Evil minion",
        icon: "enemies/evil-minion.svg",
      });
      return;
    }

    if (
      this.player.lastAttackFrame + this.player.attackInterval <
      this.dungeon.frame
    ) {
      const hit = this.player.calcHit(this.dungeon.enemy);

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
      const hit = this.dungeon.enemy.calcHit(this.player);

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
