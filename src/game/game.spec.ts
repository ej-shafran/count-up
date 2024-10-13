import * as game from ".";
import { describe, expect, it } from "vitest";

// TODO: use property-based testing

describe("game.makeMove", () => {
  it("should make a move", () => {
    expect(game.makeMove(game.initial, 0, 0)).toEqual({
      players: [{ hands: [1, 1] }, { hands: [2, 1] }],
      currentPlayer: 1,
    });
  });
});

describe("game.fromHash/game.toHash", () => {
  it("should decode the initial game properly", () => {
    expect(game.fromHash(1111)).toEqual(game.initial);
    expect(game.toHash(game.initial)).toEqual(1111);
  });
});
