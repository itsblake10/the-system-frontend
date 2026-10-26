/* -------------------------------------------------------------------------- */
/*                               PLAYER CONTEXT                               */
/* -------------------------------------------------------------------------- */
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { playerReducer } from "../reducers/playerReducer";
import {
  getPlayer,
  toggleEquipment as toggleEquipmentApi,
  useInventoryItem,
} from "../api/playerApi";
import { getUser } from "../api/userApi";
import { buyShopItem, sellShopItem } from "../api/shopApi";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [player, dispatch] = useReducer(playerReducer);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const hasLoaded = useRef(false);

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

  /* --------------------------------- LOGOUT --------------------------------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("player");

    setToken(null);
  };

  /* ---------------------------- TOGGLE EQUIP ITEM --------------------------- */
  const toggleEquipment = async (token, itemId) => {
    try {
      const playerData = await toggleEquipmentApi(token, itemId);
      dispatch({
        type: "LOAD_PLAYER",
        payload: playerData,
      });
    } catch (err) {
      console.error("Failed to toggle equipment", err);
    }
  };

  /* -------------------------------- USE ITEM -------------------------------- */
  const useItem = async (token, itemId) => {
    try {
      const playerData = await useInventoryItem(token, itemId);
      dispatch({
        type: "LOAD_PLAYER",
        payload: playerData,
      });
    } catch (err) {
      console.error("Failed to use item", err);
    }
  };

  /* -------------------------------- BUY ITEM -------------------------------- */
  const buyItem = async (token, itemId) => {
    try {
      const playerData = await buyShopItem(token, itemId);
      dispatch({
        type: "LOAD_PLAYER",
        payload: playerData,
      });
    } catch (err) {
      console.error("Failed to buy item", err);
    }
  };

  /* -------------------------------- SELL ITEM -------------------------------- */
  const sellItem = async (token, itemId) => {
    try {
      const playerData = await sellShopItem(token, itemId);
      dispatch({
        type: "LOAD_PLAYER",
        payload: playerData,
      });
    } catch (err) {
      console.error("Failed to sell item", err);
    }
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
        buyItem,
        sellItem,
        toggleEquipment,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
