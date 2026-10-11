/* -------------------------------------------------------------------------- */
/*                           PLAYER STATS COMPONENT                           */
/* -------------------------------------------------------------------------- */

import "./PlayerStats.css";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const PlayerStats = () => {
  const { player } = useContext(PlayerContext) || {};

  if (!player?.playerStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-stats">
      <h2 className="player-stats__heading">STATS</h2>
      <div className="player-stats__stat-container">
        <ul className="player-stats__list-left">
          <li className="player-stats__list-item">
            <img
              className="player-stats__icon"
              src="/str-icon.svg"
              alt="Strength Icon"
            />
            <p className="player-stats__name">STR:</p>
            <p className="player-stats__amount">{player.playerStats.STR}</p>
          </li>

          <li className="player-stats__list-item">
            <img
              className="player-stats__icon"
              src="/agi-icon.svg"
              alt="Agility Icon"
            />
            <p className="player-stats__name">AGI:</p>
            <p className="player-stats__amount">{player.playerStats.AGI}</p>
          </li>

          <li className="player-stats__list-item">
            <img
              className="player-stats__icon"
              src="/per-icon.svg"
              alt="Perception Icon"
            />
            <p className="player-stats__name">PER:</p>
            <p className="player-stats__amount">{player.playerStats.PER}</p>
          </li>
        </ul>

        <ul className="player-stats__list-right">
          <li className="player-stats__list-item">
            <img
              className="player-stats__icon"
              src="/vit-icon.svg"
              alt="Vitality Icon"
            />
            <p className="player-stats__name">VIT:</p>
            <p className="player-stats__amount">{player.playerStats.VIT}</p>
          </li>

          <li className="player-stats__list-item">
            <img
              className="player-stats__icon"
              src="/int-icon.svg"
              alt="Intelligence Icon"
            />
            <p className="player-stats__name">INT:</p>
            <p className="player-stats__amount">{player.playerStats.INT}</p>
          </li>

          <li className="player-stats__list-item">
            <img
              className="player-stats__icon"
              src="/fig-icon.svg"
              alt="Fighting Icon"
            />
            <p className="player-stats__name">FIG:</p>
            <p className="player-stats__amount">{player.playerStats.FIG}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerStats;
