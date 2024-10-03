import * as game from ".";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GameStore {
  game: game.Game;
  originHand: game.HandIndex | null;
}

interface GameStoreActions {
  selectHand(this: void, hand: game.HandIndex): void;
  deselectHand(this: void): void;
  reviveHand(this: void): void;
}

export const useGameStore = create<GameStore & GameStoreActions>()(
  immer((set, get) => ({
    game: game.initial,
    originHand: null,

    deselectHand() {
      set({ originHand: null });
    },

    selectHand(hand) {
      const store = get();
      if (store.originHand === null) {
        set({ originHand: hand });
        return;
      }

      set({
        game: game.makeMove(store.game, store.originHand, hand),
        originHand: null,
      });
    },

    reviveHand() {
      const store = get();

      set({
        game: game.split(store.game),
        originHand: null,
      });
    },
  })),
);

export const useLosingPlayer = () =>
  useGameStore((store) => {
    const losingPlayerIndex = store.game.players.findIndex((player) =>
      player.hands.every((fingers) => fingers === 0),
    );

    if (losingPlayerIndex === -1) return null;
    return losingPlayerIndex as game.PlayerIndex;
  });
