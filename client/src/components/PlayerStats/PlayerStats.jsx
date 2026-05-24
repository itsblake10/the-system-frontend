/* -------------------------------------------------------------------------- */
/*                           PLAYER STATS COMPONENT                           */
/* -------------------------------------------------------------------------- */

import "./PlayerStats.css";
import strIcon from "../../../public/str-icon.svg";
import agiIcon from "../../../public/agi-icon.svg";
import perIcon from "../../../public/per-icon.svg";
import vitIcon from "../../../public/vit-icon.svg";
import intIcon from "../../../public/int-icon.svg";
import figIcon from "../../../public/fig-icon.svg";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const PlayerStats = () => {
  const { player } = useContext(PlayerContext);

  if (!player?.playerStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-stats">
      <h2 className="player-stats__heading">STATS</h2>
      <div className="player-stats__stat-container">
        <ul className="player-stats__list-left">
          <li className="player-stats__list-item">
            <img className="player-stats__icon" src={strIcon} />
            <p className="player-stats__name">STR:</p>
            <p className="player-stats__amount">{player.playerStats.str}</p>
          </li>

          <li className="player-stats__list-item">
            <img className="player-stats__icon" src={agiIcon} />
            <p className="player-stats__name">AGI:</p>
            <p className="player-stats__amount">{player.playerStats.agi}</p>
          </li>

          <li className="player-stats__list-item">
            <img className="player-stats__icon" src={perIcon} />
            <p className="player-stats__name">PER:</p>
            <p className="player-stats__amount">{player.playerStats.per}</p>
          </li>
        </ul>

        <ul className="player-stats__list-right">
          <li className="player-stats__list-item">
            <img className="player-stats__icon" src={vitIcon} />
            <p className="player-stats__name">VIT:</p>
            <p className="player-stats__amount">{player.playerStats.vit}</p>
          </li>

          <li className="player-stats__list-item">
            <img className="player-stats__icon" src={intIcon} />
            <p className="player-stats__name">INT:</p>
            <p className="player-stats__amount">{player.playerStats.int}</p>
          </li>

          <li className="player-stats__list-item">
            <img className="player-stats__icon" src={figIcon} />
            <p className="player-stats__name">FIG:</p>
            <p className="player-stats__amount">{player.playerStats.fig}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerStats;
