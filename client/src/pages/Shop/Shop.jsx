/* -------------------------------------------------------------------------- */
/*                                  SHOP PAGE                                 */
/* -------------------------------------------------------------------------- */
import "./Shop.css";
import GameItem from "../../components/GameItem/GameItem";
import { useState, useEffect, useContext } from "react";
import ItemFilter from "../../components/ItemFilter/ItemFilter.jsx";
import { PlayerContext } from "../../contexts/PlayerContext";
import { getShopItems } from "../../api/shopApi.js";
import { getInventoryItems } from "../../api/playerApi.js";

function Shop({ onOpenShopItem }) {
  const { token } = useContext(PlayerContext) || {};

  const [inventoryItems, setInventoryItems] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("buy");

  const inventorySize = 30;

  const shopSize = 50;

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

  useEffect(() => {
    const loadShopItems = async () => {
      try {
        const data = await getShopItems();
        setShopItems(data);
      } catch (err) {
        console.error("Failed to load shop items:", err);
      }
    };
    if (token) {
      loadShopItems();
    }
  }, []);

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
