import type { Item } from "../types";
import ItemSquare from "./ItemSquare";

type Props = {
  item: Item;
};

const ItemTooltip: React.FC<Props> = ({ item }) => {
  return (
    <div className="h-20 border border-gray-500 rounded-sm flex gap-2 p-2">
      <div className="w-10">
        <ItemSquare item={item} onClick={() => {}} />
      </div>
      <div>
        <div>{item.name}</div>
        {item.stats.map((stat, idx) => (
          <span key={idx}>
            {stat.type}: {stat.value > 0 && "+"}
            {stat.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ItemTooltip;
