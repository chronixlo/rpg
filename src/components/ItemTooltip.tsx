import { RARITY_COLORS, STAT_LABELS, type Item } from "../types";
import ItemSquare from "./ItemSquare";

type Props = {
  item: Item;
};

const ItemTooltip: React.FC<Props> = ({ item }) => {
  return (
    <div className="border-2 border-amber-800 rounded-sm flex gap-2 p-2">
      <div className="w-16">
        <ItemSquare item={item} onClick={() => {}} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span style={{ color: RARITY_COLORS[item.rarity] }}>{item.name}</span>
          <span>{item.type}</span>
        </div>
        <div className="flex gap-10 flex-wrap">
          {item.stats.map((stat, idx) => (
            <span key={idx}>
              {STAT_LABELS[stat.type]}: {stat.value > 0 && "+"}
              {stat.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemTooltip;
