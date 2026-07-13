import { observer } from "mobx-react-lite";
import HealthBar from "./HealthBar";
import "./UnitFrame.css";
import Icon from "../components/Icon";
import type { Unit } from "../stores/Unit";

type Props = { unit: Unit };

const UnitFrame: React.FC<Props> = observer(({ unit }) => {
  return (
    <div className="border border-amber-800 p-2 flex gap-2 bg-stone-700 rounded-xl">
      <div className="relative w-20 h-20 border border-amber-800 rounded-xl overflow-hidden">
        <Icon src={unit.icon}>{unit.name.slice(0, 1)}</Icon>
        {unit.lastReceivedHit && (
          <span
            key={unit.lastReceivedHit.frame}
            className="hit-splat text-red-500"
          >
            {-unit.lastReceivedHit.value}
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        {unit.name}
        <HealthBar
          damageTaken={unit.damageTaken}
          maxHealth={unit.resolvedStats.hp}
        />
      </div>
    </div>
  );
});

export default UnitFrame;
