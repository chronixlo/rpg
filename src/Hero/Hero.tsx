import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";
import ItemSquare from "../components/ItemSquare";
import { useState } from "react";
import {
  EQUIPMENT_TYPES,
  type EquipmentType,
  type Item,
  type StatType,
} from "../types";
import ItemDialog from "../components/ItemDialog";
import Icon from "../components/Icon";

const Hero = observer(() => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="flex-1 flex flex-col gap-2 overflow-hidden p-2">
      <div className="flex justify-center gap-2">
        {Object.keys(playerStore.player.resolvedStats).map((stat) => (
          <div key={stat} className="w-30 border flex flex-col text-center">
            <div>{stat}</div>
            <Icon>{stat}</Icon>
            <div>{playerStore.player.resolvedStats[stat as StatType]}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {Object.keys(EQUIPMENT_TYPES).map((slot) => (
          <div key={slot} className="flex-1 text-center">
            <div>{slot}</div>
            <ItemSquare
              item={
                playerStore.player.equipment[slot as EquipmentType] || undefined
              }
              onClick={() =>
                setSelectedItem(
                  playerStore.player.equipment[slot as EquipmentType],
                )
              }
            />
          </div>
        ))}
      </div>

      {selectedItem && (
        <ItemDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
});

export default Hero;
