import { RARITY_COLORS, type Item } from "../types";
import Icon from "./Icon";

interface Props {
  onClick: (e: React.MouseEvent) => void;
  item?: Item;
  equippedItem?: Item;
}

const ItemSquare: React.FC<Props> = ({ onClick, item, equippedItem }) => {
  return (
    <div
      onClick={onClick}
      className="border-2 border-gray-500 w-full aspect-auto overflow-hidden relative"
      style={{
        borderWidth: item ? "4px" : "2px",
        borderRadius: "10%",
        borderStyle: item ? "solid" : "dashed",
        borderColor: item && RARITY_COLORS[item.rarity],
      }}
    >
      <Icon src={item?.icon}>{item?.name.slice(0, 1)}</Icon>
      <div className="absolute bottom-0 right-0 p-0.5 bg-black leading-none text-xs">
        {item?.level}
      </div>
      {item && equippedItem && item.level > equippedItem.level && (
        <div className="absolute top-0 right-0 p-0.5 bg-black leading-none text-lg font-extrabold">
          ↑
        </div>
      )}
    </div>
  );
};

export default ItemSquare;
