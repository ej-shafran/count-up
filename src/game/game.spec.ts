import { gameProperty } from "@/__test__/properties/game.property";
import * as game from ".";
import { describe, expect, it } from "vitest";
import { produce } from "immer";

// TODO: use property-based testing

describe("game.makeMove", () => {
  it("should make a move", () => {
    expect(game.makeMove(game.initial, 0, 0)).toEqual({
      players: [{ hands: [1, 1] }, { hands: [2, 1] }],
      currentPlayer: 1,
    });
  });
});

const sorted = produce<game.Game>((draft) => {
  draft.players.forEach((player) => {
    player.hands.sort((a, b) => b - a);
  });
});

describe("game.{to,from}Hash", () => {
  gameProperty("produce the same hash as a sorted game", (g) => {
    expect(game.toHash(g)).toBe(game.toHash(sorted(g)));
  });

  gameProperty("always decode to sorted value", (g) => {
    expect(game.fromHash(game.toHash(g))).toEqual(sorted(g));
  });
});
