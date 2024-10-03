import * as result from "./result";
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

export function hash(game: Game): number {
  return [
    game.current as number,
    ...game.players.flatMap((player) =>
      [...player.hands].sort((a, b) => a - b),
    ),
  ].reduce(
    (acc, cur, i, array) => acc + cur * Math.pow(10, array.length - i - 1),
    0,
  );
}

export function stringify(game: Game): string {
  return [game.current, ...game.players.flatMap((player) => player.hands)].join(
    "",
  );
}

export enum ParseErrorReason {
  EMPTY_STRING,
  INVALID_CURRENT_PLAYER,
  INVALID_PLAYER_AMOUNT,
  INVALID_HAND_AMOUNT,
  INVALID_HAND_VALUE,
}

export class ParseError {
  readonly _tag = "game.ParseError";

  readonly message: string;

  constructor(readonly reason: ParseErrorReason) {
    this.message = ParseErrorReason[reason];
  }
}

export function parse(raw: string): result.Result<Game, ParseError> {
  const currentRaw = raw[0];
  if (!currentRaw)
    return result.fail(new ParseError(ParseErrorReason.EMPTY_STRING));

  const current = parseInt(currentRaw);
  if (isNaN(current) || current < 0 || current >= PLAYER_AMOUNT)
    return result.fail(new ParseError(ParseErrorReason.INVALID_CURRENT_PLAYER));

  const playerAmount = (raw.length - 1) / HAND_AMOUNT;
  if (playerAmount !== PLAYER_AMOUNT)
    return result.fail(new ParseError(ParseErrorReason.INVALID_PLAYER_AMOUNT));

  const players = Array.from({ length: PLAYER_AMOUNT }, (_, i) => ({
    hands: [
      ...raw.slice(i * PLAYER_AMOUNT + 1, i * PLAYER_AMOUNT + 1 + HAND_AMOUNT),
    ].map((rawHand) => parseInt(rawHand)),
  }));

  if (
    players.some(
      (player) =>
        player.hands.length !== HAND_AMOUNT || player.hands.some(isNaN),
    )
  ) {
    return result.fail(new ParseError(ParseErrorReason.INVALID_HAND_AMOUNT));
  }

  if (
    players.some((player) =>
      player.hands.some((hand) => hand < 0 || hand > MAX_COUNT),
    )
  ) {
    return result.fail(new ParseError(ParseErrorReason.INVALID_HAND_VALUE));
  }

  return result.succeed({ current, players } as Game);
}
