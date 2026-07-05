import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";

const Inventory = observer(() => {
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {new Array(playerStore.inventorySize).fill(null).map((_, idx) => (
        <div key={idx} className="border border-gray-500 aspect-square">
          {playerStore.inventory[idx]?.name}
        </div>
      ))}
    </div>
  );
});

export default Inventory;
