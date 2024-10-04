import {
  deselectHand,
  splitHand,
  selectHand,
  useGameStore,
  useLoser,
  useCurrentPlayer,
  useCanSplit,
  useIsClickable,
} from "../game/store";
import * as game from "../game";
import { Finger } from "./Finger";
import clsx from "clsx";

export interface HandProps {
  playerIndex: game.PlayerIndex;
  handIndex: game.HandIndex;
}

export function Hand({ handIndex, playerIndex }: HandProps) {
  const fingers = useGameStore(
    (store) => store.game.players[playerIndex].hands[handIndex],
  );
  const isSelected = useGameStore(
    (store) =>
      store.game.current === playerIndex && store.originHand === handIndex,
  );

  const currentPlayer = useCurrentPlayer();
  const loser = useLoser();

  const canSplit = useCanSplit(playerIndex);
  const isClickable = useIsClickable(playerIndex);

  const border =
    loser !== 1 && (currentPlayer === 1 || loser === 0)
      ? "border-playerTwo-300"
      : "border-playerOne-300";

  if (fingers === 0) {
    return (
      <button
        disabled={loser !== null || !canSplit}
        className={clsx(
          "w-1/2 grow",
          canSplit && ["rounded border-2 border-dashed bg-gray-100", border],
        )}
        onClick={() => {
          if (!canSplit) return;

          splitHand();
        }}
      />
    );
  }

  return (
    <button
      disabled={loser !== null || (!isClickable && !isSelected)}
      className={clsx(
        "grid w-1/2 grow grid-cols-2 grid-rows-2 rounded border-2 p-8 transition-colors",
        playerIndex === 1
          ? isSelected
            ? "bg-playerTwo-200"
            : "bg-playerTwo-100"
          : isSelected
            ? "bg-playerOne-200"
            : "bg-playerOne-100",
        border,
        isClickable && "border-dashed",
      )}
      onClick={() => {
        if (isSelected) {
          deselectHand();
          return;
        }

        if (!isClickable) return;

        selectHand(handIndex);
      }}
    >
      {Array.from({ length: fingers }, (_, i) => (
        <Finger key={i} playerIndex={playerIndex} />
      ))}
    </button>
  );
}
