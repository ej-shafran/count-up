import { Player } from "./player";
import { GameOverPopup } from "./game-over-popup";
import { AiPlayerPopup } from "./ai-player-popup";
import { RestartGameButton } from "./restart-game-button";
import { RulesButton } from "./rules-popup";

export function Game() {
  return (
    <div className="arvo-regular m-auto flex size-full flex-col p-3 text-center lg:w-1/2 lg:px-0">
      <div className="flex w-full flex-col justify-center gap-2 lg:flex-row lg:gap-3">
        <h1 className="arvo-bold text-4xl">Count Up</h1>

        <div className="flex w-full justify-center gap-3 lg:w-0">
          <RulesButton />
          <RestartGameButton
            className="lg:fixed lg:end-3 lg:top-3"
            variant="outline"
            asIcon
          />
        </div>
      </div>
      <div className="flex grow flex-col gap-3">
        <Player player={1} />
        <Player player={0} />
      </div>

      <AiPlayerPopup />
      <GameOverPopup />
    </div>
  );
}
