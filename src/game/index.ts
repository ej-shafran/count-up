import { produce } from "immer";
import type { NumberRange } from "../types/number-range";
import { Tuple } from "../types/tuple";

export const HAND_AMOUNT = 2;
export const PLAYER_AMOUNT = 2;
export const MAX_COUNT = 4;

export type HandValue = NumberRange<{
  max: typeof MAX_COUNT;
}>;
export type HandIndex = NumberRange<{
  max: typeof HAND_AMOUNT;
  isExclusive: true;
}>;
export type PlayerIndex = NumberRange<{
  max: typeof PLAYER_AMOUNT;
  isExclusive: true;
}>;

export interface Player {
  readonly hands: Tuple<HandValue, typeof HAND_AMOUNT>;
}

export interface Game {
  readonly players: Tuple<Player, typeof PLAYER_AMOUNT>;
  readonly current: PlayerIndex;
}

export const initial: Game = {
  players: [{ hands: [1, 1] }, { hands: [1, 1] }],
  current: 0,
};

export function split(game: Game) {
  const emptyHand = game.players[game.current].hands.indexOf(0);
  const originValue = game.players[game.current].hands[emptyHand === 0 ? 1 : 0];

  if (emptyHand === -1 || originValue === 0)
    throw new Error("TODO: handle invalid inputs");

  return produce(game, (draft) => {
    draft.players[draft.current].hands = [originValue / 2, originValue / 2] as [
      HandValue,
      HandValue,
    ];
    draft.current = draft.current === 0 ? 1 : 0;
  });
}

export function makeMove(
  game: Game,
  originHand: HandIndex,
  targetHand: HandIndex,
): Game {
  const originValue = game.players[game.current].hands[originHand];
  const otherPlayerIndex: PlayerIndex = game.current === 0 ? 1 : 0;
  const targetValue = game.players[otherPlayerIndex].hands[targetHand];
  const newValue = ((targetValue + originValue) % 5) as HandValue;
  return produce(game, (draft) => {
    draft.players[otherPlayerIndex].hands[targetHand] = newValue;
    draft.current = otherPlayerIndex;
  });
}
