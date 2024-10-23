import cn from "clsx";
import * as game from "@/game";
import { Hand } from "./hand";
import {
  useCanSplit,
  useCurrentPlayer,
  useGameStore,
  useIsClickable,
  useLoser,
} from "@/game/store";

export interface PlayerProps {
  player: game.Player;
}

export function Player({ player }: PlayerProps) {
  const aiPlayer = useGameStore((store) => store.aiPlayer);
  const currentPlayer = useCurrentPlayer();
  const canSplit = useCanSplit(player);
  const isClickable = useIsClickable(player);
  const otherIsClickable = useIsClickable(game.getOtherPlayer(player));
  const loser = useLoser();

  return (
    <div
      className={cn(
        "flex h-1/2 grow gap-3",
        player === 1 ? "flex-col" : "flex-col-reverse",
      )}
    >
      <h2 className="text-xl">
        {(loser !== null ||
          currentPlayer !== player ||
          aiPlayer === player) && (
          <>
            Player {player === 1 ? "Two" : "One"}
            {player === aiPlayer ? " (Computer)" : ""}
          </>
        )}

        {loser === null && currentPlayer === player && (
          <>
            {isClickable && (
              <>Select a hand to use{canSplit && " (or SPLIT)"}</>
            )}

            {otherIsClickable && (
              <>Select a hand to target{canSplit && " (or SPLIT)"}</>
            )}
          </>
        )}
      </h2>

      <div className="flex grow gap-3">
        <Hand player={player} hand={0} />
        <Hand player={player} hand={1} />
      </div>
    </div>
  );
}
