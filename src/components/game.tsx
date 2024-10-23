import { Player } from "./player";
import { GameOverPopup } from "./game-over-popup";
import { AiPlayerPopup } from "./ai-player-popup";
import { RestartGameButton } from "./restart-game-button";

export function Game() {
  return (
    <div className="m-auto flex size-full flex-col p-3 text-center lg:w-1/2 lg:px-0">
      <h1 className="arvo-bold text-4xl">Counting Game</h1>
      <div className="flex grow flex-col gap-3">
        <Player player={1} />
        <Player player={0} />
      </div>
      <RestartGameButton />

      <AiPlayerPopup />
      <GameOverPopup />
    </div>
  );
}
