import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";
import HealthBar from "../components/HealthBar";
import Button from "../components/Button";
import ItemSquare from "../components/ItemSquare";

const Dungeon = observer(() => {
  return (
    <div className="flex flex-col gap-2 p-2">
      Hero
      <HealthBar
        damageTaken={playerStore.player.damageTaken}
        maxHealth={playerStore.player.maxHealth}
      />
      {playerStore.dungeon?.enemy ? (
        <>
          Enemy
          <HealthBar
            damageTaken={playerStore.dungeon.enemy.damageTaken}
            maxHealth={playerStore.dungeon.enemy.maxHealth}
          />
        </>
      ) : (
        <div>no enemy</div>
      )}
      Loot
      <div className="flex gap-1">
        {playerStore.dungeon?.loot.map((item, idx) => (
          <ItemSquare key={idx} item={item} onClick={() => {}} />
        ))}
      </div>
      {(!playerStore.dungeon || playerStore.dungeon.endedAt) && (
        <Button onClick={() => playerStore.startDungeon()}>New dungeon</Button>
      )}
    </div>
  );
});

export default Dungeon;
