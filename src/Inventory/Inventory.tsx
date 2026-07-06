import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";
import Icon from "../components/Icon";

const Inventory = observer(() => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-4 place-content-start gap-2 p-2 overflow-y-auto">
        {new Array(playerStore.inventorySize).fill(null).map((_, idx) => (
          <div key={idx} className="border border-gray-500 aspect-square">
            <Icon>{playerStore.inventory[idx]?.name}</Icon>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Inventory;
