import {
  RARITIES,
  type Item,
  type ItemType,
  type Stat,
  type StatType,
} from "./types";

let id = 1;

const itemTemplates: Record<
  string,
  {
    type: ItemType;
    icons: string[];
    stats: StatType[];
  }
> = {
  dagger: {
    type: "weapon",
    icons: ["items/weapon/sacrificial-dagger.svg"],
    stats: ["str"],
  },
  head: {
    type: "head",
    icons: ["items/head/closed-barbute.svg"],
    stats: ["hp", "def"],
  },
  chest: {
    type: "chest",
    icons: ["items/chest/shoulder-armor.svg"],
    stats: ["hp", "def"],
  },
  gloves: {
    type: "gloves",
    icons: ["items/gloves/mailed-fist.svg"],
    stats: ["hp", "def"],
  },
  boots: {
    type: "boots",
    icons: ["items/boots/metal-boot.svg"],
    stats: ["hp", "def"],
  },
};

const dropRates = {
  common: 0.7,
  rare: 0.3,
  epic: 0.1,
  legendary: 0.01,
};

export const getRandomItem = (level: number) => {
  const templates = Object.values(itemTemplates);
  const template = templates[Math.floor(Math.random() * templates.length)];

  let statsToAllocate = level;
  const stats: Stat[] = [];

  template.stats.forEach((stat, index, array) => {
    let value;

    if (index === array.length - 1) {
      value = statsToAllocate;
    } else {
      value = Math.floor(Math.random() * statsToAllocate);
    }

    stats.push({
      type: stat,
      value,
    });

    statsToAllocate -= value;
  });

  const item: Item = {
    id: Date.now() + id++,
    name: String.fromCharCode(80 + Math.floor(Math.random() * 10)),
    stats,
    type: template.type,
    icon: template.icons[Math.floor(Math.random() * template.icons.length)],
    rarity: RARITIES.common,
  };

  return item;
};
