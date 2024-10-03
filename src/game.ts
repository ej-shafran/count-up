import * as Result from "./result";

export const HAND_AMOUNT = 2;
export const PLAYER_AMOUNT = 2;
export const MAX_COUNT = 5;

type SizedArray<TItem, TLength extends number> = readonly TItem[] & {
  readonly length: TLength;
};

type RangeImpl<
  TMax extends number,
  TAcc extends 1[] = [],
> = TAcc["length"] extends TMax
  ? never
  : TAcc["length"] | RangeImpl<TMax, [...TAcc, 1]>;

type Range<TMax extends number> = RangeImpl<TMax>;

type Hand = Range<typeof MAX_COUNT>;

export interface Player {
  readonly hands: SizedArray<Hand, typeof HAND_AMOUNT>;
}

export interface Game {
  readonly players: SizedArray<Player, typeof PLAYER_AMOUNT>;
  readonly current: number;
}

export const initial: Game = {
  players: [{ hands: [1, 1] }, { hands: [1, 1] }],
  current: 0,
};

export function hash(game: Game): number {
  return [
    game.current,
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

export function parse(raw: string): Result.Result<Game, ParseError> {
  const currentRaw = raw[0];
  if (!currentRaw)
    return Result.fail(new ParseError(ParseErrorReason.EMPTY_STRING));

  const current = parseInt(currentRaw);
  if (isNaN(current) || current < 0 || current >= PLAYER_AMOUNT)
    return Result.fail(new ParseError(ParseErrorReason.INVALID_CURRENT_PLAYER));

  const playerAmount = (raw.length - 1) / HAND_AMOUNT;
  if (playerAmount !== PLAYER_AMOUNT)
    return Result.fail(new ParseError(ParseErrorReason.INVALID_PLAYER_AMOUNT));

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
    return Result.fail(new ParseError(ParseErrorReason.INVALID_HAND_AMOUNT));
  }

  if (
    players.some((player) =>
      player.hands.some((hand) => hand < 0 || hand >= MAX_COUNT),
    )
  ) {
    return Result.fail(new ParseError(ParseErrorReason.INVALID_HAND_VALUE));
  }

  return Result.succeed({
    current,
    players: players as Game["players"],
  });
}
