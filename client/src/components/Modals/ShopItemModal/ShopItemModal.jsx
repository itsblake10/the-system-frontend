/* -------------------------------------------------------------------------- */
/*                               SHOP ITEM MODAL                              */
/* -------------------------------------------------------------------------- */
import "./ShopItemModal.css";
import { useContext, useState } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import iconPlaceholder from "../../../../public/icon-placeholder.svg";

const ShopItemModal = ({ item, mode }) => {
  const { player, dispatch } = useContext(PlayerContext) || {};

  const [qty, setQty] = useState(1);

  const itemIcon = item.image || iconPlaceholder;

  const inventoryItem = player.inventory.find(
    (inventoryItem) => inventoryItem.id === item.id,
  );

  const isBuyMode = mode === "buy";

  /* --------------------------------- BUTTON --------------------------------- */
  const buttonText = isBuyMode ? "BUY" : "SELL";

  /* ------------------------------ MODAL MESSAGE ----------------------------- */
  let message = null;
  let buttonDisabled = false;

  if (isBuyMode) {
    if (item.levelRequirement > player.playerLevel.level) {
      message = {
        type: "level",
        value: item.levelRequirement,
      };
      buttonDisabled = true;
    } else if (item.price.buy > player.currency.coins) {
      message = {
        type: "buy",
        value: item.price.buy,
      };
      buttonDisabled = true;
    }
  } else {
    const isEquipped = player.equipment?.weapon === item.id;

    if (!inventoryItem || inventoryItem.quantity <= 0) {
      message = {
        type: "sell",
      };
      buttonDisabled = true;
    } else if (isEquipped && inventoryItem.quantity === 1) {
      message = {
        type: "equipped",
      };
      buttonDisabled = true;
    }
  }

  /* ---------------------------- QUANTITY CONTROLS --------------------------- */
  const maxBuyQuantity =
    item.price.buy > 0 ? Math.floor(player.currency.coins / item.price.buy) : 0;

  const isEquipped = player.equipment?.weapon === item.id;

  const maxSellQuantity = isEquipped
    ? Math.max(0, (inventoryItem?.quantity ?? 0) - 1)
    : (inventoryItem?.quantity ?? 0);

  const maxQuantity = isBuyMode ? maxBuyQuantity : maxSellQuantity;

  const increaseQuantity = () => {
    setQty((prev) => Math.min(maxQuantity, prev + 1));
  };

  const decreaseQuantity = () => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  /* --------------------------- HANDLE BUTTON CLICK -------------------------- */
  const handleButtonClick = () => {
    if (isBuyMode) {
      dispatch({
        type: "BUY_ITEM",
        payload: {
          item,
          qty: Number(qty),
        },
      });
    } else if (!isBuyMode) {
      dispatch({
        type: "SELL_ITEM",
        payload: {
          item,
          qty: Number(qty),
        },
      });
    }
  };

  return (
    <div className="shop-item-modal">
      <h2 className="shop-item-modal__title">{item.name}</h2>
      <div className="shop-item-modal__image-cont">
        <img
          className="shop-item-modal__image"
          src={itemIcon}
          alt="Item Image"
        />
      </div>
      <section className="shop-item-modal__specs-section">
        <ul className="shop-item-modal__specs">
          <li className="shop-item-modal__specs-item">
            <span className="shop-item-modal__specs-label">Name:</span>
            <span className="shop-item-modal__specs-name">{item.name}</span>
          </li>
          <span className="shop-item-modal__specs-divide">|</span>
          <li className="shop-item-modal__specs-item">
            <span className="shop-item-modal__specs-label">Type:</span>
            <span className="shop-item-modal__specs-type">{item.itemType}</span>
          </li>
          <span className="shop-item-modal__specs-divide">|</span>
          <li className="shop-item-modal__specs-item">
            <span className="shop-item-modal__specs-label">Level:</span>
            <span className="shop-item-modal__specs-level">
              {item.levelRequirement || "N/A"}
            </span>
          </li>
          <span className="shop-item-modal__specs-divide">|</span>
          <li className="shop-item-modal__specs-item">
            <span className="shop-item-modal__specs-label">Rarity:</span>
            <span className="shop-item-modal__specs-rarity">
              {item.rarity || "N/A"}
            </span>
          </li>
          <span className="shop-item-modal__specs-divide">|</span>
          <li className="shop-item-modal__specs-item">
            <span className="shop-item-modal__specs-label">Qty:</span>
            <span className="shop-item-modal__specs-qty">
              {inventoryItem?.quantity || 0}
            </span>
          </li>
          <span className="shop-item-modal__specs-divide">|</span>
          <li className="shop-item-modal__specs-item">
            <span className="shop-item-modal__specs-label">Effect:</span>
            <span className="shop-item-modal__specs-effect">
              {item.effect.damage}
            </span>
          </li>
        </ul>
      </section>
      <section className="shop-item-modal__desc">
        <h3 className="shop-item-modal__desc-title">Description:</h3>
        <p className="shop-item-modal__desc-text">{item.description}</p>
      </section>
      <div className="shop-item-modal__message">
        {message?.type === "level" && (
          <p>
            * Requires Level{" "}
            <span className="shop-item-modal__message_colour">
              {message.value}
            </span>{" "}
            *
          </p>
        )}
        {message?.type === "buy" && <p>* Not Enough Coins *</p>}
        {message?.type === "sell" && <p>* Not Enough Items *</p>}
        {message?.type === "equipped" && <p>* Item Equipped *</p>}
      </div>
      <div className="shop-item-modal__actions">
        <div className="shop-item-modal__qty-select">
          <button
            className="shop-item-modal__decrease"
            onClick={decreaseQuantity}
            disabled={qty <= 1}
          >
            -
          </button>
          <div className="shop-item-modal__qty-cont">
            <p className="shop-item-modal__qty">{qty}</p>
          </div>
          <button
            className="shop-item-modal__increase"
            onClick={increaseQuantity}
            disabled={qty >= maxQuantity}
          >
            +
          </button>
        </div>
        <button
          className={`shop-item-modal__button ${
            isBuyMode
              ? "shop-item-modal__button--buy"
              : "shop-item-modal__button--sell"
          }`}
          disabled={buttonDisabled}
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ShopItemModal;
