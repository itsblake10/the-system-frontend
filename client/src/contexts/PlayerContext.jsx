/* -------------------------------------------------------------------------- */
/*                               PLAYER CONTEXT                               */
/* -------------------------------------------------------------------------- */
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { playerReducer } from "../reducers/playerReducer";
import { initialPlayerState } from "../utils/initialPlayerState";

export const PlayerContext = createContext();

const loadPlayer = (initialPlayerState) => {
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

  const [loading, setLoading] = useState(true);
  const hasLoaded = useRef(false);

  /* -------------------------- LOAD PLAYER ON START -------------------------- */
  useEffect(() => {
    const fetchPlayer = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getPlayer(token);

        dispatch({
          type: "LOAD_PLAYER",
          payload: data,
        });
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchPlayer();
  }, []);

  /* ---------------------- SAVE TO LOCAL STORAGE (CACHE) --------------------- */
  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      return;
    }

    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  /* ----------------------------- SAVE TO BACKEND ---------------------------- */
  const saveTimeout = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      savePlayer(token, player);
    }, 800);
  }, [player]);

  return (
    <PlayerContext.Provider value={{ player, dispatch, loading }}>
      {children}
    </PlayerContext.Provider>
  );
}
