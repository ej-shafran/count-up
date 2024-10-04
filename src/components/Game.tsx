import { useLosingPlayer } from "../game/store";
import { Player } from "./Player";

export function Game() {
  const losingPlayer = useLosingPlayer();

  return (
    <div className="m-auto flex h-full w-1/2 flex-col py-3 text-center">
      <h1>Counting Game</h1>
      <div className="flex grow flex-col gap-3">
        <Player playerIndex={1} />
        <Player playerIndex={0} />
      </div>

      {losingPlayer !== null && <div>Game Over</div>}
    </div>
  );
}
