/* -------------------------------------------------------------------------- */
/*                                  SHOP PAGE                                 */
/* -------------------------------------------------------------------------- */
import "./Shop.css";
import GameItem from "../../components/GameItem/GameItem";
import { items } from "../../utils/gameItems.js";
import { shopItems } from "../../utils/shopItems.js";
import { useState } from "react";
import ItemFilter from "../../components/ItemFilter/ItemFilter.jsx";

function Shop({ onOpenShopItem }) {
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("buy");

  const inventorySize = 30;

  const shopSize = 50;

  const inventoryItems = items;

  const sellItems = inventoryItems
    .map((inventoryItem) => {
      const shopItem = shopItems.find(
        (shopItem) => shopItem.id === inventoryItem.id,
      );

      if (!shopItem) return null;

      return {
        ...shopItem,
        quantity: inventoryItem.quantity,
      };
    })
    .filter(Boolean);

  const buyItems = shopItems;

  const filteredItems = sellItems.filter(
    (item) => filter === "all" || item.itemType === filter,
  );

  const filteredShopItems = buyItems.filter(
    (item) => filter === "all" || item.itemType === filter,
  );

  const itemSlots = Array.from(
    { length: inventorySize },
    (_, index) => filteredItems[index] ?? null,
  );

  const shopSlots = Array.from(
    { length: shopSize },
    (_, index) => filteredShopItems[index] ?? null,
  );

  return (
    <main className="shop__page">
      <h1 className="shop__title">SHOP</h1>
      <ItemFilter filter={filter} setFilter={setFilter} />
      <div className="shop__buttons">
        <button
          className={`shop__button ${
            activeTab === "buy" ? "shop__button--active" : ""
          }`}
          onClick={() => setActiveTab("buy")}
        >
          BUY
        </button>
        <button
          className={`shop__button ${
            activeTab === "sell" ? "shop__button--active" : ""
          }`}
          onClick={() => setActiveTab("sell")}
        >
          SELL
        </button>
      </div>
      <div className="shop__grid-container">
        <h2 className="shop__grid-title">ITEMS</h2>
        <div className="shop__grid">
          {(activeTab === "buy" ? shopSlots : itemSlots).map((item, index) => (
            <GameItem
              key={index}
              item={item}
              onClick={onOpenShopItem}
              mode={activeTab}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Shop;
