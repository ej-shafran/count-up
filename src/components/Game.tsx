import { Player } from "./Player";
import { GameOverPopup } from "./GameOverPopup";

export function Game() {
  return (
    <div className="m-auto flex h-full w-1/2 flex-col py-3 text-center">
      <h1 className="arvo-bold text-4xl">Counting Game</h1>
      <div className="flex grow flex-col gap-3">
        <Player playerIndex={1} />
        <Player playerIndex={0} />
      </div>

      <GameOverPopup />
    </div>
  );
}
