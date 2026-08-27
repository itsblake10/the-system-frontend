/* -------------------------------------------------------------------------- */
/*                               INVENTORY PAGE                               */
/* -------------------------------------------------------------------------- */
import "./Inventory.css";
import GameItem from "../../components/GameItem/GameItem";
import { items } from "../../utils/gameItems.js";
import ItemFilter from "../../components/ItemFilter/ItemFilter.jsx";
import { useState } from "react";

function Inventory({ onOpenInventoryItem }) {
  const [filter, setFilter] = useState("all");

  const inventorySize = 30;

  const inventoryItems = items;

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
