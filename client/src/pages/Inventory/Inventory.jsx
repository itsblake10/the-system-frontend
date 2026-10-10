/* -------------------------------------------------------------------------- */
/*                               INVENTORY PAGE                               */
/* -------------------------------------------------------------------------- */
import "./Inventory.css";
import GameItem from "../../components/GameItem/GameItem";
import ItemFilter from "../../components/ItemFilter/ItemFilter.jsx";
import { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { getInventoryItems } from "../../api/playerApi.js";

function Inventory({ onOpenInventoryItem }) {
  const { token } = useContext(PlayerContext) || {};

  const [filter, setFilter] = useState("all");
  const [inventoryItems, setInventoryItems] = useState([]);

  const inventorySize = 30;

  useEffect(() => {
    const loadInventoryItems = async () => {
      try {
        const data = await getInventoryItems(token);
        setInventoryItems(data);
      } catch (err) {
        console.error("Failed to load inventory items:", err);
      }
    };
    if (token) {
      loadInventoryItems();
    }
  }, [token]);

  const filteredItems = inventoryItems.filter(
    (item) => filter === "all" || item.itemType === filter,
  );

  const itemSlots = Array.from(
    { length: inventorySize },
    (_, index) => filteredItems[index] ?? null,
  );

  return (
    <main className="inventory__page">
      <h1 className="inventory__title">INVENTORY</h1>
      <ItemFilter filter={filter} setFilter={setFilter} />
      <div className="inventory__grid-container">
        <h2 className="inventory__grid-title">ITEMS</h2>
        <div className="inventory__grid">
          {itemSlots.map((item, index) => (
            <GameItem key={index} item={item} onClick={onOpenInventoryItem} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Inventory;
