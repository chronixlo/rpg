import { autorun, makeAutoObservable, toJS } from "mobx";
import {
  type BaseStats,
  type Dungeon,
  type EquipmentType,
  type Item,
} from "../types";
import { Unit } from "./Unit";
import { getRandomItem } from "../itemGenerator";
import { LEATHER, STEEL } from "../staticItems";
import { distributeStats } from "../utils";

const TICK_RATE = 50;
const STORAGE_KEY = "rpg-save";

class PlayerStore {
  player = new Unit({ name: "Hero", icon: "hero.svg" });

  inventorySize = 16;
  inventory: Item[] = [];

  dungeon: Dungeon | null = null;
  level = 1;

  constructor() {
    makeAutoObservable(this);

    this.load();
    this.persist();
    setInterval(this.tick, TICK_RATE);
  }

  private load = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const data = JSON.parse(raw);
      this.player = new Unit(data.player);
      this.inventory = data.inventory ?? [];
      this.level = data.level ?? 1;
    } catch {
      this.player = new Unit({ name: "Hero", icon: "hero.svg" });
      this.inventory = [];
      this.level = 1;
    }
  };

  private persist = () => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    autorun(() => {
      const data = {
        player: toJS(this.player),
        inventory: toJS(this.inventory),
        level: this.level,
      };
      // combat mutates the player every tick, so debounce the writes
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }, 500);
    });
  };

  setLevel = (level: number) => {
    this.level = level;
  };

  startDungeon() {
    this.player.lastAttackFrame = 0;

    this.dungeon = {
      frame: 0,
      startedAt: Date.now(),
      endedAt: null,
      enemy: null,
      level: this.level,
      loot: [],
    };
  }

  endDungeon() {
    if (this.dungeon) {
      this.dungeon.endedAt = Date.now();
    }
  }

  discardDungeon() {
    if (!this.dungeon) {
      return;
    }
    this.dungeon = null;
  }

  equipItem = (item: Item) => {
    const oldEquipped = this.player.equipment[item.type as EquipmentType];
    this.player.equipment[item.type as EquipmentType] = item;

    // remove from loot if dungeon still active
    if (this.dungeon) {
      const lootIndex = this.dungeon.loot.findIndex((i) => i.id === item.id);
      this.dungeon.loot.splice(lootIndex, 1);
    }

    const index = this.inventory.findIndex((i) => i.id === item.id);
    this.inventory.splice(index, 1);

    if (oldEquipped) {
      this.inventory.push(oldEquipped);
    }
  };

  salvageItem = (item: Item) => {
    // remove from loot if dungeon still active
    if (this.dungeon) {
      const lootIndex = this.dungeon.loot.findIndex((i) => i.id === item.id);
      this.dungeon.loot.splice(lootIndex, 1);
    }

    const index = this.inventory.findIndex((i) => i.id === item.id);
    this.inventory.splice(index, 1);

    const material: Item = item.type === "weapon" ? STEEL : LEATHER;

    const materialIndex = this.inventory.findIndex((i) => i.id === material.id);
    if (materialIndex === -1) {
      this.inventory.push(material);
    } else {
      this.inventory[materialIndex].count! += 1;
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
        this.inventory.push(item);
      }

      // base stats are 1 10 1
      const stats = distributeStats(
        ["str", "hp", "def"],
        (this.dungeon.level - 1) * 4,
      );
      const baseStats = stats.reduce(
        (prev, next) => ({ ...prev, [next.type]: next.value }),
        {},
      ) as BaseStats;

      baseStats.str += 1;
      baseStats.hp += 10;
      baseStats.def += 1;

      this.dungeon.enemy = new Unit({
        attackInterval: 5,
        baseStats,
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

    if (
      this.player.damageTaken >= this.player.resolvedStats.hp ||
      this.inventory.length >= this.inventorySize
    ) {
      this.endDungeon();
    }
  };
}

const playerStore = new PlayerStore();

export default playerStore;
