import { produce } from "immer";
import type { NumberRange } from "@/types/number-range";
import type { Tuple } from "@/types/tuple";

export const HANDS = 2;
export const PLAYERS = 2;
export const MAX_FINGERS = 4;

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

export function split(game: Game): Game | null {
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
