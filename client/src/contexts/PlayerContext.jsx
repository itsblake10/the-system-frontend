/* -------------------------------------------------------------------------- */
/*                               PLAYER CONTEXT                               */
/* -------------------------------------------------------------------------- */
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { playerReducer } from "../reducers/playerReducer";
import { getPlayer, getUser, savePlayer } from "../api/authApi";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [player, dispatch] = useReducer(playerReducer);
  const [user, setUser] = useState(null);
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
        const playerData = await getPlayer(token);

        dispatch({
          type: "LOAD_PLAYER",
          payload: playerData,
        });

        const userData = await getUser(token);
        setUser(userData);
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

  /* ------------------------------- EQUIP ITEM ------------------------------- */
  const toggleEquipment = (item) => {
    dispatch({
      type: "TOGGLE_EQUIPMENT",
      payload: {
        itemId: item.id,
        slot: "weapon",
      },
    });
  };

  /* -------------------------------- USE ITEM -------------------------------- */
  const useItem = (item) => {
    dispatch({
      type: "USE_ITEM",
      payload: {
        itemId: item.id,
        effect: item.effect,
      },
    });
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        user,
        setUser,
        dispatch,
        loading,
        token,
        setToken,
        logout,
        useItem,
        toggleEquipment,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
