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
    <div className="flex flex-col gap-2 p-2">
      <UnitFrame unit={playerStore.player} name="Hero" />

      {playerStore.dungeon?.enemy ? (
        <>
          <UnitFrame unit={playerStore.dungeon.enemy} name="Enemy" />
        </>
      ) : null}

      {playerStore.dungeon && playerStore.dungeon?.loot.length !== 0 && (
        <>
          Loot
          <div className="flex gap-1">
            {playerStore.dungeon?.loot.map((item, idx) => (
              <div key={idx} className="w-8 h-8">
                <ItemSquare
                  item={item}
                  onClick={() => setSelectedItem(item || null)}
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
            playerStore.player.equipment[selectedItem.type as EquipmentType] ||
            undefined
          }
          onClose={() => setSelectedItem(null)}
        />
      )}

      {playerStore.dungeon?.endedAt && (
        <Button onClick={() => playerStore.discardDungeon()}>Get loot</Button>
      )}

      {!playerStore.dungeon && (
        <Button onClick={() => playerStore.startDungeon()}>
          Start dungeon
        </Button>
      )}
    </div>
  );
});

export default Dungeon;
