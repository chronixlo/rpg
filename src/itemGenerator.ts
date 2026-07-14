import {
  RARITIES,
  RARITY_MULTIPLIERS,
  type Item,
  type ItemType,
  type Stat,
  type StatType,
} from "./types";
import { randomFromArray } from "./utils";

let id = 1;

const itemAdjectives = [
  "Formidable",
  "Ancient",
  "Cursed",
  "Blessed",
  "Radiant",
  "Shattered",
  "Ethereal",
  "Savage",
  "Pristine",
  "Corrupted",
  "Gleaming",
  "Venomous",
  "Molten",
  "Frozen",
  "Runic",
  "Forsaken",
  "Vengeful",
  "Hallowed",
  "Tarnished",
  "Enchanted",
  "Brutal",
  "Ornate",
  "Dreadful",
  "Celestial",
  "Infernal",
  "Weathered",
  "Gilded",
  "Shadowed",
  "Volatile",
  "Sacred",
  "Wretched",
  "Piercing",
  "Resilient",
  "Spectral",
  "Tempered",
  "Rusted",
  "Arcane",
  "Feral",
  "Immaculate",
  "Doomed",
  "Sundered",
  "Glorious",
  "Malevolent",
  "Serrated",
  "Tranquil",
  "Rugged",
  "Timeworn",
  "Blazing",
  "Frostbitten",
  "Unyielding",
];

const itemTemplates: Record<
  string,
  {
    type: ItemType;
    names: string[];
    icons: string[];
    stats: StatType[];
  }
> = {
  dagger: {
    type: "weapon",
    names: ["Dagger", "Knife", "Blade"],
    icons: ["items/weapon/sacrificial-dagger.svg"],
    stats: ["str"],
  },
  head: {
    type: "head",
    names: ["Helmet", "Barbute"],
    icons: ["items/head/closed-barbute.svg"],
    stats: ["hp", "def"],
  },
  chest: {
    type: "chest",
    names: ["Chestplate", "Cuirass"],
    icons: ["items/chest/shoulder-armor.svg"],
    stats: ["hp", "def"],
  },
  gloves: {
    type: "gloves",
    names: ["Gauntlets", "Gloves"],
    icons: ["items/gloves/mailed-fist.svg"],
    stats: ["hp", "def"],
  },
  boots: {
    type: "boots",
    names: ["Boots", "Sabatons"],
    icons: ["items/boots/metal-boot.svg"],
    stats: ["hp", "def"],
  },
};

export const getRandomItem = (level: number) => {
  const templates = Object.values(itemTemplates);
  const template = randomFromArray(templates);

  const rarityRoll = Math.random();
  const rarity =
    rarityRoll < 0.1
      ? RARITIES.epic
      : rarityRoll < 0.3
        ? RARITIES.rare
        : rarityRoll < 0.6
          ? RARITIES.uncommon
          : RARITIES.common;

  const itemLevel = Math.round(level * RARITY_MULTIPLIERS[rarity]);
  let statsToAllocate = itemLevel;
  const stats: Stat[] = [];

  template.stats.forEach((stat, index, array) => {
    let value;

    if (index === array.length - 1) {
      value = statsToAllocate;
    } else {
      value = Math.round(Math.random() * statsToAllocate);
    }

    stats.push({
      type: stat,
      value,
    });

    statsToAllocate -= value;
  });

  const item: Item = {
    id: Date.now() + id++,
    level: itemLevel,
    name:
      randomFromArray(itemAdjectives) + " " + randomFromArray(template.names),
    stats: stats.filter((stat) => stat.value !== 0),
    type: template.type,
    icon: randomFromArray(template.icons),
    rarity,
  };

  return item;
};
