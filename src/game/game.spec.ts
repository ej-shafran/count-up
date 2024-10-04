import * as game from ".";
import { describe, expect, it } from "vitest";

// TODO: use property-based testing

describe("game.makeMove", () => {
  it("should make a move", () => {
    expect(game.makeMove(game.initial, 0, 0)).toEqual({
      players: [{ hands: [1, 1] }, { hands: [2, 1] }],
      current: 1,
    });
  });
});
