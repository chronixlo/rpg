import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";
import { useState } from "react";
import {
  EQUIPMENT_TYPES,
  type EquipmentType,
  type Item,
  type StatType,
} from "../types";
import ItemDialog from "../components/ItemDialog";
import ItemTooltip from "../components/ItemTooltip";

const Hero = observer(() => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="flex-1 flex flex-col gap-2 overflow-hidden p-2">
      <div className="flex justify-center gap-2">
        {Object.keys(playerStore.player.resolvedStats).map((stat) => (
          <div
            key={stat}
            className="w-30 p-4 border-2 border-amber-800 rounded-lg flex flex-col text-center"
          >
            <div>{stat}</div>
            <div className="text-3xl">
              {playerStore.player.resolvedStats[stat as StatType]}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {Object.keys(EQUIPMENT_TYPES).map((slot) => (
          <ItemTooltip
            key={slot}
            item={playerStore.player.equipment[slot as EquipmentType]}
          />
        ))}
      </div>

      {selectedItem && (
        <ItemDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
});

export default Hero;
