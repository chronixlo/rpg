import type { Item } from "../types";

interface Props {
  onClick: (e: React.MouseEvent) => void;
  item: Item;
}

const ItemSquare: React.FC<Props> = ({ onClick, item }) => {
  return (
    <div onClick={onClick} className="border w-10 h-10">
      {item.name.slice(0, 1)}
    </div>
  );
};

export default ItemSquare;
