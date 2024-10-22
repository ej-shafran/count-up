import {
  canSplitGameProperty,
  gameProperty,
  notOverGameProperty,
  overGameProperty,
} from "@/__test__/properties/game.property";
import * as game from ".";
import { describe, expect } from "vitest";
import { produce } from "immer";

const sorted = produce<game.Game>((draft) => {
  draft.players.forEach((player) => {
    player.hands.sort((a, b) => b - a);
  });
});

const summed = (g: game.Game) => {
  return (
    g.players.reduce(
      (acc, cur) => acc + cur.hands.reduce((acc: number, cur) => acc + cur, 0),
      0,
    ) % game.BASE
  );
};

describe("game.{to,from}Hash", () => {
  gameProperty("produce the same hash as a sorted game", (g) => {
    expect(game.toHash(g)).toBe(game.toHash(sorted(g)));
  });

  gameProperty("always decode to sorted value", (g) => {
    expect(game.fromHash(game.toHash(g))).toEqual(sorted(g));
  });
});

describe("game.possibleMoves", () => {
  overGameProperty("always return no valid moves", (g) => {
    const moves = game.possibleMoves(g);
    expect(moves.length).toBe(0);
  });

  notOverGameProperty("always return at least one valid move", (g) => {
    const moves = game.possibleMoves(g);
    expect(moves.length).toBeGreaterThan(0);
  });

  notOverGameProperty("always have some change to the players' hands", (g) => {
    const moves = game.possibleMoves(g);
    expect(moves.map((g) => g.players)).not.toContainEqual(g.players);
  });

  notOverGameProperty("only create valid changes to the game", (g) => {
    const gameSum = summed(g);
    const currentPlayerData = g.players[g.currentPlayer];
    const possibleSums = currentPlayerData.hands.map(
      (fingers) => (gameSum + fingers) % game.BASE,
    );

    const moves = game.possibleMoves(g);
    for (const move of moves) {
      const moveSum = summed(move);
      expect(possibleSums).toContain(moveSum);
    }
  });

  canSplitGameProperty("include splitting the current player's hand", (g) => {
    const moves = game.possibleMoves(g);
    expect(moves).toContainEqual(game.split(g));
  });
});
