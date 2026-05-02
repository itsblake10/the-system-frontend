/* -------------------------------------------------------------------------- */
/*                               PLAYER CONTEXT                               */
/* -------------------------------------------------------------------------- */
import { createContext, useEffect, useReducer, useRef } from "react";
import { playerReducer } from "../reducers/playerReducer";
import { initialPlayerState } from "../utils/initialPlayerState";

export const PlayerContext = createContext();

const loadPlayer = () => {
  try {
    const saved = localStorage.getItem("player");
    return saved ? JSON.parse(saved) : initialPlayerState;
  } catch {
    return initialPlayerState;
  }
};

export function PlayerProvider({ children }) {
  const [player, dispatch] = useReducer(
    playerReducer,
    initialPlayerState,
    loadPlayer,
  );

  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      return;
    }

    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  return (
    <PlayerContext.Provider value={{ player, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}
