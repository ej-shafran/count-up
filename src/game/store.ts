import * as game from ".";

import { create } from "zustand";

interface GameStore {
  game: game.Game;
  originHand: game.HandIndex | null;
}

export function reviveHand() {
  const store = useGameStore.getState();

  useGameStore.setState({
    game: game.split(store.game),
    originHand: null,
  });
}

export function deselectHand() {
  useGameStore.setState({ originHand: null });
}

export function selectHand(hand: game.HandIndex) {
  const store = useGameStore.getState();
  if (store.originHand === null) {
    useGameStore.setState({ originHand: hand });
    return;
  }

  useGameStore.setState({
    game: game.makeMove(store.game, store.originHand, hand),
    originHand: null,
  });
}

export const useGameStore = create<GameStore>()(() => ({
  game: game.initial,
  originHand: null,
}));

export const useLoser = () =>
  useGameStore((store) => {
    const losingPlayerIndex = store.game.players.findIndex((player) =>
      player.hands.every((fingers) => fingers === 0),
    );

    if (losingPlayerIndex === -1) return null;
    return losingPlayerIndex as game.PlayerIndex;
  });
