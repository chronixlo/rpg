import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";
import ItemSquare from "../components/ItemSquare";
import { useState } from "react";
import type { EquipmentType, Item } from "../types";
import ItemDialog from "../components/ItemDialog";

const Inventory = observer(() => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-4 place-content-start gap-2 p-2 overflow-y-auto">
        {new Array(playerStore.inventorySize).fill(null).map((_, idx) => (
          <div key={idx}>
            <ItemSquare
              item={playerStore.inventory[idx]}
              onClick={() =>
                setSelectedItem(playerStore.inventory[idx] || null)
              }
              equippedItem={
                playerStore.inventory[idx] &&
                playerStore.player.equipment[
                  playerStore.inventory[idx].type as EquipmentType
                ]
              }
            />
          </div>
        ))}
      </div>
      {selectedItem && (
        <ItemDialog
          item={selectedItem}
          equippedItem={
            playerStore.player.equipment[selectedItem.type as EquipmentType]
          }
          onClose={() => setSelectedItem(null)}
          onEquip={playerStore.equipItem}
        />
      )}
    </div>
  );
});

export default Inventory;
