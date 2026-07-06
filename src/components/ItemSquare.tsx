import type { Item } from "../types";
import Icon from "./Icon";

interface Props {
  onClick: (e: React.MouseEvent) => void;
  item: Item;
}

const ItemSquare: React.FC<Props> = ({ onClick, item }) => {
  return (
    <div onClick={onClick} className="border w-8 h-8">
      <Icon>{item.name.slice(0, 1)}</Icon>
    </div>
  );
};

export default ItemSquare;
