import { produce } from "immer";
import type { NumberRange } from "@/types/number-range";
import { Tuple } from "@/types/tuple";

export const HAND_AMOUNT = 2;
export const PLAYER_AMOUNT = 2;
export const MAX_COUNT = 4;

export type Fingers = NumberRange<{
  max: typeof MAX_COUNT;
}>;
export type Hand = NumberRange<{
  max: typeof HAND_AMOUNT;
  isExclusive: true;
}>;
export type Player = NumberRange<{
  max: typeof PLAYER_AMOUNT;
  isExclusive: true;
}>;

export interface PlayerData {
  readonly hands: Tuple<Fingers, typeof HAND_AMOUNT>;
}

export interface Game {
  readonly players: Tuple<PlayerData, typeof PLAYER_AMOUNT>;
  readonly currentPlayer: Player;
}

export const initial: Game = {
  players: [{ hands: [1, 1] }, { hands: [1, 1] }],
  currentPlayer: 0,
};

export function split(game: Game) {
  const emptyHand = game.players[game.currentPlayer].hands.indexOf(0);
  const originValue =
    game.players[game.currentPlayer].hands[emptyHand === 0 ? 1 : 0];

  if (emptyHand === -1 || originValue === 0)
    throw new Error("TODO: handle invalid inputs");

  return produce(game, (draft) => {
    draft.players[draft.currentPlayer].hands = [
      originValue / 2,
      originValue / 2,
    ] as [Fingers, Fingers];
    draft.currentPlayer = draft.currentPlayer === 0 ? 1 : 0;
  });
}

export function makeMove(game: Game, originHand: Hand, targetHand: Hand): Game {
  const originValue = game.players[game.currentPlayer].hands[originHand];
  const otherPlayer: Player = game.currentPlayer === 0 ? 1 : 0;
  const targetValue = game.players[otherPlayer].hands[targetHand];
  const newValue = ((targetValue + originValue) % 5) as Fingers;
  return produce(game, (draft) => {
    draft.players[otherPlayer].hands[targetHand] = newValue;
    draft.currentPlayer = otherPlayer;
  });
}
