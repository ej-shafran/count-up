import type { NumberRange } from "./types/number-range";
import { Tuple } from "./types/tuple";

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
