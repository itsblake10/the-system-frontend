/* -------------------------------------------------------------------------- */
/*                            INVENTORY ITEM MODAL                            */
/* -------------------------------------------------------------------------- */
import "./InventoryItemModal.css";
import { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import iconPlaceholder from "../../../../public/icon-placeholder.svg";

const InventoryItemModal = ({ item }) => {
  const { player, toggleEquipment, useItem } = useContext(PlayerContext) || {};

  const itemIcon = item.image || iconPlaceholder;

  /* -------------------------------- ITEM QTY -------------------------------- */
  const inventoryItem = player.inventory.find(
    (inventoryItem) => inventoryItem.id === item.id,
  );

  /* ------------------------------ BUTTON CHECK ------------------------------ */
  const isConsumable = item.itemType === "Consumable";
  const isWeapon = item.itemType === "Weapon";
  const isCrafting = item.itemType === "Crafting";
  const isOwned = inventoryItem?.quantity > 0;

  const isEquipped = player.equipment?.weapon === item.id;

  const healthFull =
    player.playerStatus.health >= player.playerStatus.maxHealth;

  const manaFull = player.playerStatus.mana >= player.playerStatus.maxMana;

  const enoughCrystals = (inventoryItem?.quantity ?? 0) >= item.crystalsNeeded;

  let buttonText = "";
  let buttonDisabled = false;
  let buttonClass = "";
  let message = null;

  if (isWeapon) {
    buttonText = isEquipped ? "UNEQUIP" : "EQUIP";
    buttonClass = isEquipped ? "inventory-item-modal__button--red" : "";
  }

  if (isConsumable) {
    if (item.effect.health) {
      buttonText = healthFull ? "FULL" : "USE";
      buttonDisabled = healthFull;
    } else if (item.effect.mana) {
      buttonText = manaFull ? "FULL" : "USE";
      buttonDisabled = manaFull;
    }
  }

  if (isCrafting) {
    buttonText = enoughCrystals ? "CRAFT" : "NOT ENOUGH";
    buttonDisabled = !enoughCrystals;
  }

  if (!isOwned) {
    buttonDisabled = true;
  }

  /* ----------------------------- MODAL MESSAGES ----------------------------- */
  if (item.levelRequirement > player.playerLevel.level) {
    message = {
      type: "level",
      value: item.levelRequirement,
    };

    buttonDisabled = true;
  }

  /* --------------------------- HANDLE BUTTON CLICK -------------------------- */
  const handleButtonClick = () => {
    if (isWeapon) {
      toggleEquipment(item);
    } else if (isConsumable) {
      useItem(item);
    }
  };

  return (
    <div className="inventory-item-modal">
      <h2 className="inventory-item-modal__title">{item.name}</h2>
      <div className="inventory-item-modal__image-cont">
        <img
          className="inventory-item-modal__image"
          src={itemIcon}
          alt="Item Image"
        />
      </div>
      <section className="inventory-item-modal__specs-section">
        <ul className="inventory-item-modal__specs">
          <li className="inventory-item-modal__specs-item">
            <span className="inventory-item-modal__specs-label">Name:</span>
            <span className="inventory-item-modal__specs-name">
              {item.name}
            </span>
          </li>
          <span className="inventory-item-modal__specs-divide">|</span>
          <li className="inventory-item-modal__specs-item">
            <span className="inventory-item-modal__specs-label">Type:</span>
            <span className="inventory-item-modal__specs-type">
              {item.itemType}
            </span>
          </li>
          <span className="inventory-item-modal__specs-divide">|</span>
          <li className="inventory-item-modal__specs-item">
            <span className="inventory-item-modal__specs-label">Level:</span>
            <span className="inventory-item-modal__specs-level">
              {item.levelRequirement || "N/A"}
            </span>
          </li>
          <span className="inventory-item-modal__specs-divide">|</span>
          <li className="inventory-item-modal__specs-item">
            <span className="inventory-item-modal__specs-label">Rarity:</span>
            <span className="inventory-item-modal__specs-rarity">
              {item.rarity || "N/A"}
            </span>
          </li>
          <span className="inventory-item-modal__specs-divide">|</span>
          <li className="inventory-item-modal__specs-item">
            <span className="inventory-item-modal__specs-label">Qty:</span>
            <span className="inventory-item-modal__specs-qty">
              {inventoryItem?.quantity ?? 0}
            </span>
          </li>
          <span className="inventory-item-modal__specs-divide">|</span>
          <li className="inventory-item-modal__specs-item">
            <span className="inventory-item-modal__specs-label">Effect:</span>
            <span className="inventory-item-modal__specs-effect">
              {item.effect?.damage || "N/A"}
            </span>
          </li>
        </ul>
      </section>
      <section className="inventory-item-modal__desc">
        <h3 className="inventory-item-modal__desc-title">Description:</h3>
        <p className="inventory-item-modal__desc-text">{item.description}</p>
      </section>
      <div className="inventory-item-modal__message">
        {message?.type === "level" && (
          <p>
            * Requires Level{" "}
            <span className="inventory-item-modal__message_colour">
              {message.value}
            </span>{" "}
            *
          </p>
        )}
      </div>
      <button
        className={`inventory-item-modal__button ${buttonClass}`}
        disabled={buttonDisabled}
        onClick={handleButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InventoryItemModal;
