import { RARITY_COLORS, type Item } from "../types";
import Icon from "./Icon";

interface Props {
  onClick: (e: React.MouseEvent) => void;
  item?: Item;
}

const ItemSquare: React.FC<Props> = ({ onClick, item }) => {
  return (
    <div
      onClick={onClick}
      className="border-2 border-gray-500 w-full aspect-auto overflow-hidden"
      style={{
        borderWidth: item ? "4px" : "2px",
        borderRadius: "10%",
        borderStyle: item ? "solid" : "dashed",
        borderColor: item && RARITY_COLORS[item.rarity],
      }}
    >
      <Icon src={item?.icon}>{item?.name.slice(0, 1)}</Icon>
    </div>
  );
};

export default ItemSquare;
