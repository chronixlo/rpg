import { observer } from "mobx-react-lite";
import playerStore from "../stores/playerStore";
import Button from "../components/Button";
import ItemSquare from "../components/ItemSquare";
import UnitFrame from "../components/UnitFrame";

const Dungeon = observer(() => {
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
              <ItemSquare key={idx} item={item} onClick={() => {}} />
            ))}
          </div>
          {(!playerStore.dungeon || playerStore.dungeon.endedAt) && (
            <Button onClick={() => playerStore.discardDungeon()}>
              Get loot
            </Button>
          )}
        </>
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
