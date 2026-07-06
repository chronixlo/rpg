import { observer } from "mobx-react-lite";
import type { Unit } from "../types";
import HealthBar from "./HealthBar";
import "./UnitFrame.css";
import Icon from "./Icon";

type Props = { unit: Unit; name: string };

const UnitFrame: React.FC<Props> = observer(({ unit, name }) => {
  return (
    <div className="border border-gray-500 p-2 flex gap-2">
      <div className="relative w-10 h-10 border border-gray-500">
        <Icon>{name.slice(0, 1)}</Icon>
        {unit.lastReceivedHit && (
          <span
            key={unit.lastReceivedHit.frame}
            className="hit-splat text-red-500"
          >
            {-unit.lastReceivedHit.value}
          </span>
        )}
      </div>
      <div className="flex-1">
        {name}
        <HealthBar damageTaken={unit.damageTaken} maxHealth={unit.maxHealth} />
      </div>
    </div>
  );
});

export default UnitFrame;
