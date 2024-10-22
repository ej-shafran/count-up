import { produce } from "immer";
import type { NumberRange } from "@/types/number-range";
import type { Tuple } from "@/types/tuple";
import { CustomSet } from "@/lib/custom-set";

export const HANDS = 2;
export const PLAYERS = 2;
export const MAX_FINGERS = 4;
export const BASE = MAX_FINGERS + 1;

export type Fingers = NumberRange<{
  max: typeof MAX_FINGERS;
}>;
export type Hand = NumberRange<{
  max: typeof HANDS;
  isExclusive: true;
}>;
export type Player = NumberRange<{
  max: typeof PLAYERS;
  isExclusive: true;
}>;

export interface PlayerData {
  readonly hands: Tuple<Fingers, typeof HANDS>;
}

export interface Game {
  readonly players: Tuple<PlayerData, typeof PLAYERS>;
  readonly currentPlayer: Player;
}

export const initial: Game = {
  players: [{ hands: [1, 1] }, { hands: [1, 1] }],
  currentPlayer: 0,
};

export function getHandByFingers(
  game: Game,
  player: Player,
  fingers: Fingers,
): Hand | -1 {
  return game.players[player].hands.indexOf(fingers) as Hand | -1;
}

export function getLoser(game: Game): Player | null {
  const index = game.players.findIndex((player) =>
    player.hands.every((hand) => hand === 0),
  ) as Player | -1;
  if (index === -1) return null;
  return index;
}

export function isOver(game: Game): boolean {
  return getLoser(game) !== null;
}

export function split(game: Game): Game | null {
  if (isOver(game)) return null;

  const emptyHand = getHandByFingers(game, game.currentPlayer, 0);

  if (emptyHand === -1) return null;

  const originFingers =
    game.players[game.currentPlayer].hands[getOtherHand(emptyHand)];

  if (originFingers === 0 || originFingers % 2 !== 0) return null;

  const newFingers = (originFingers / 2) as Fingers;
  return produce(game, (draft) => {
    draft.players[draft.currentPlayer].hands = [newFingers, newFingers];
    draft.currentPlayer = getOtherPlayer(draft.currentPlayer);
  });
}

export function canSplit(game: Game): boolean {
  return split(game) !== null;
}

export function getOtherPlayer(player: Player): Player {
  return player === 0 ? 1 : 0;
}

export function getOtherHand(hand: Hand): Hand {
  return hand === 0 ? 1 : 0;
}

export function makeMove(
  game: Game,
  originHand: Hand,
  targetHand: Hand,
): Game | null {
  const originFingers = game.players[game.currentPlayer].hands[originHand];
  if (originFingers === 0) return null;

  const otherPlayer: Player = getOtherPlayer(game.currentPlayer);
  const targetFingers = game.players[otherPlayer].hands[targetHand];
  if (targetFingers === 0) return null;

  const newFingers = ((targetFingers + originFingers) % 5) as Fingers;
  return produce(game, (draft) => {
    draft.players[otherPlayer].hands[targetHand] = newFingers;
    draft.currentPlayer = otherPlayer;
  });
}

function nthDigit(num: number, n: number) {
  return Math.floor(num / Math.pow(BASE, n - 1)) % BASE;
}

function toDigitHash(arr: number[]) {
  return arr.reduce(
    (acc, cur, i, arr) => acc + cur * Math.pow(BASE, arr.length - i - 1),
    0,
  );
}

export function toHash(game: Game): number {
  return toDigitHash([
    game.currentPlayer,
    Math.max(...game.players[0].hands),
    Math.min(...game.players[0].hands),
    Math.max(...game.players[1].hands),
    Math.min(...game.players[1].hands),
  ]);
}

export function fromHash(hash: number): Game {
  return {
    currentPlayer: nthDigit(hash, 5) as Player,
    players: [
      { hands: [nthDigit(hash, 4) as Fingers, nthDigit(hash, 3) as Fingers] },
      { hands: [nthDigit(hash, 2) as Fingers, nthDigit(hash, 1) as Fingers] },
    ],
  };
}

export function possibleMoves(game: Game): Game[] {
  return Array.from(
    new CustomSet(
      toHash,
      [
        split(game),
        ...new Array(HANDS)
          .fill(0)
          .flatMap((_, originHand) =>
            new Array(HANDS)
              .fill(0)
              .map((_, targetHand) =>
                makeMove(game, originHand as Hand, targetHand as Hand),
              ),
          ),
      ].filter((move) => move !== null),
    ),
  );
}

export function makeAiMove(game: Game): Game | null {
  const moves = possibleMoves(game);
  if (!moves.length) return null;
  return moves[Math.floor(Math.random() * moves.length)] ?? null;
}
