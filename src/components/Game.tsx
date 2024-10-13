import { Player } from "./Player";
import { GameOverPopup } from "./GameOverPopup";
import { AiPlayerPopup } from "./AiPlayerPopup";

export function Game() {
  return (
    <div className="m-auto flex size-full flex-col p-3 text-center lg:w-1/2 lg:px-0">
      <h1 className="arvo-bold text-4xl">Counting Game</h1>
      <div className="flex grow flex-col gap-3">
        <Player player={1} />
        <Player player={0} />
      </div>

      <AiPlayerPopup />
      <GameOverPopup />
    </div>
  );
}
