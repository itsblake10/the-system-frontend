/* -------------------------------------------------------------------------- */
/*                               PLAYER CONTEXT                               */
/* -------------------------------------------------------------------------- */
import { createContext, useReducer } from "react";
import { playerReducer } from "../reducers/playerReducer";
import { initialPlayerState } from "../utils/initialPlayerState";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [player, dispatch] = useReducer(playerReducer, initialPlayerState);

  return (
    <PlayerContext.Provider value={{ player, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}
