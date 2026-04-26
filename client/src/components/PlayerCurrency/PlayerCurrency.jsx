/* -------------------------------------------------------------------------- */
/*                          PLAYER CURRENCY COMPONENT                         */
/* -------------------------------------------------------------------------- */

import "./PlayerCurrency.css";
import coinIcon from "../../../public/coin-icon.svg";
import raidKeyIcon from "../../../public/raid-key-icon.svg";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const PlayerCurrency = () => {
  const { player } = useContext(PlayerContext);

  return (
    <div className="player-currency">
      <div className="player-currency__coins">
        <p className="player-currency__label">COINS:</p>
        <div className="player-currency__container">
          <img className="player-currency__coins-icon" src={coinIcon} />
          <span className="player-currency__divider"></span>
          <p className="player-currency__coins-amount">
            {player.currency.coins}
          </p>
        </div>
      </div>

      <div className="player-currency__raid-keys">
        <p className="player-currency__label">RAID KEYS:</p>
        <div className="player-currency__container">
          <img className="player-currency__raid-keys-icon" src={raidKeyIcon} />
          <span className="player-currency__divider"></span>
          <p className="player-currency__raid-keys-amount">
            {player.currency.raidKeys}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCurrency;
