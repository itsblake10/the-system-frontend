/* -------------------------------------------------------------------------- */
/*                                 ITEM FILTER                                */
/* -------------------------------------------------------------------------- */
import "./ItemFilter.css";
import coinIcon from "../../../public/coin-icon.svg";
import raidKeyIcon from "../../../public/raid-key-icon.svg";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const ItemFilter = ({ filter, setFilter }) => {
  const { player } = useContext(PlayerContext);

  return (
    <div className="item-filter">
      <select className="item-filter__select">
        <option
          className="item-filter__option"
          onClick={() => setFilter("all")}
        >
          All
        </option>
        <option
          className="item-filter__option"
          onClick={() => setFilter("Weapon")}
        >
          Weapons
        </option>
        <option
          className="item-filter__option"
          onClick={() => setFilter("Armor")}
        >
          Armor
        </option>
        <option
          className="item-filter__option"
          onClick={() => setFilter("Consumable")}
        >
          Consumables
        </option>
      </select>
      <div className="item-filter__currency-cont">
        <p className="item-filter__currency-title">CURRENCY</p>
        <div className="item-filter__currency">
          <div className="item-filter__coins-cont">
            <img
              className="item-filter__coin-icon"
              src={coinIcon}
              alt="Coin Icon"
            />
            <span className="item-filter__divider"></span>
            <p className="item-filter__amount">{player.currency.coins}</p>
          </div>

          <div className="item-filter__keys-cont">
            <img
              className="item-filter__key-icon"
              src={raidKeyIcon}
              alt="Raid Key Icon"
            />
            <span className="item-filter__divider"></span>
            <p className="item-filter__amount">{player.currency.raidKeys}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFilter;
