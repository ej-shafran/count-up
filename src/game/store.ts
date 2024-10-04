import * as game from ".";

import { create } from "zustand";

interface GameStore {
  game: game.Game;
  originHand: game.HandIndex | null;
}

export function splitHand() {
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

export const useCurrentPlayer = () =>
  useGameStore((store) => store.game.current);

export const useCanSplit = (playerIndex: game.PlayerIndex) =>
  useGameStore((store) => {
    if (store.game.current !== playerIndex) return false;

    const emptyHand = store.game.players[playerIndex].hands.indexOf(0);
    if (emptyHand === -1) return false;

    const otherHandFingers =
      store.game.players[playerIndex].hands[emptyHand === 0 ? 1 : 0];
    return otherHandFingers !== 0 && otherHandFingers % 2 === 0;
  });

export const useIsClickable = (playerIndex: game.PlayerIndex) =>
  useGameStore(
    (store) =>
      (store.game.current === playerIndex) === (store.originHand === null),
  );

export const useLoser = () =>
  useGameStore((store) => {
    const losingPlayerIndex = store.game.players.findIndex((player) =>
      player.hands.every((fingers) => fingers === 0),
    );

    if (losingPlayerIndex === -1) return null;
    return losingPlayerIndex as game.PlayerIndex;
  });
