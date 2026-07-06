import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";
import Icon from "../components/Icon";

const Inventory = observer(() => {
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {new Array(playerStore.inventorySize).fill(null).map((_, idx) => (
        <div key={idx} className="border border-gray-500 aspect-square">
          <Icon>{playerStore.inventory[idx]?.name}</Icon>
        </div>
      ))}
    </div>
  );
});

export default Inventory;
