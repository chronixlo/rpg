import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";
import Button from "../components/Button";
import ItemSquare from "../components/ItemSquare";
import UnitFrame from "./UnitFrame";
import { useState } from "react";
import type { EquipmentType, Item } from "../types";
import ItemDialog from "../components/ItemDialog";

const Dungeon = observer(() => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="flex flex-col gap-2 p-2 h-full overflow-auto">
      <UnitFrame unit={playerStore.player} />

      {playerStore.dungeon?.enemy ? (
        <>
          <UnitFrame unit={playerStore.dungeon.enemy} />
        </>
      ) : null}

      {playerStore.dungeon && playerStore.dungeon?.loot.length !== 0 && (
        <>
          Loot
          <div className="flex gap-1">
            {playerStore.dungeon?.loot.map((item, idx) => (
              <div key={idx} className="w-20 h-20">
                <ItemSquare
                  item={item}
                  onClick={() => setSelectedItem(item || null)}
                  equippedItem={
                    playerStore.player.equipment[item.type as EquipmentType]
                  }
                />
              </div>
            ))}
          </div>
        </>
      )}

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

      <div className="mt-auto">
        {playerStore.dungeon?.endedAt && (
          <Button
            onClick={() => playerStore.discardDungeon()}
            className="h-10 w-full"
          >
            Exit dungeon
          </Button>
        )}

        {!playerStore.dungeon && (
          <Button
            onClick={() => playerStore.startDungeon()}
            className="h-10 w-full"
          >
            Start dungeon
          </Button>
        )}
      </div>
    </div>
  );
});

export default Dungeon;
