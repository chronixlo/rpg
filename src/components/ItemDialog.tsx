import { EQUIPMENT_TYPES, type EquipmentType, type Item } from "../types";
import Button from "./Button";
import ItemTooltip from "./ItemTooltip";

type Props = {
  item: Item;
  onClose: () => void;
  equippedItem?: Item;
  onEquip?: (item: Item) => void;
};

const ItemDialog: React.FC<Props> = ({
  item,
  equippedItem,
  onClose,
  onEquip,
}) => {
  return (
    <div className="absolute inset-0 w-dvw h-dvh flex items-center justify-center z-30">
      <div
        className="absolute inset-0 w-full h-full bg-gray-500 opacity-50"
        onClick={onClose}
      />
      <div className="w-sm h-sm bg-stone-900 p-2 rounded-sm z-1">
        <div className="flex flex-col gap-2">
          <ItemTooltip item={item} />

          {equippedItem && (
            <>
              Equipped
              <ItemTooltip item={equippedItem} />
            </>
          )}

          <div className="flex justify-end gap-2">
            {onEquip && EQUIPMENT_TYPES[item.type as EquipmentType] && (
              <Button
                onClick={() => {
                  onEquip(item);
                  onClose();
                }}
              >
                Equip
              </Button>
            )}
            <Button onClick={onClose} type="outline">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDialog;
