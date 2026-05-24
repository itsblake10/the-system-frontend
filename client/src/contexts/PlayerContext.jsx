/* -------------------------------------------------------------------------- */
/*                               PLAYER CONTEXT                               */
/* -------------------------------------------------------------------------- */
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { playerReducer } from "../reducers/playerReducer";
import { initialPlayerState } from "../utils/initialPlayerState";
import { getPlayer, savePlayer } from "../api/authApi";

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
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const hasLoaded = useRef(false);
  const saveTimeout = useRef(null);
  const hasInitialisedSave = useRef(false);

  /* -------------------------- LOAD PLAYER ON START -------------------------- */
  useEffect(() => {
    const fetchPlayer = async () => {
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
  }, [token]);

  /* ---------------------- SAVE TO LOCAL STORAGE (CACHE) --------------------- */
  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      return;
    }

    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  /* ----------------------------- SAVE TO BACKEND ---------------------------- */
  useEffect(() => {
    if (!token) return;

    if (!hasInitialisedSave.current) {
      hasInitialisedSave.current = true;
      return;
    }

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      savePlayer(token, player);
    }, 800);
  }, [player, token]);

  /* --------------------------------- LOGOUT --------------------------------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("player");

    setToken(null);
  };

  return (
    <PlayerContext.Provider
      value={{ player, dispatch, loading, token, setToken, logout }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
