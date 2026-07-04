/* -------------------------------------------------------------------------- */
/*                          LEVEL PROGRESS COMPONENT                          */
/* -------------------------------------------------------------------------- */
import "./LevelProgress.css";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const LevelProgress = () => {
  const { player } = useContext(PlayerContext) || {};

  if (!player?.playerLevel) {
    return <div>Loading...</div>;
  }

  const xpPercent =
    (player.playerLevel.xp / player.playerLevel.xpToNextLevel) * 100;

  return (
    <div className="level-progress">
      <h2 className="level-progress__heading">NEXT LEVEL</h2>
      <div className="level-progress__container">
        <div className="level-progress__level-container">
          <p className="level-progress__level">{player.playerLevel.level}</p>
          <p className="level-progress__level">
            {player.playerLevel.level + 1}
          </p>
        </div>
        <div className="level-progress__bar">
          <span
            className="level-progress__bar-level"
            style={{ width: `${xpPercent}%` }}
          ></span>
        </div>
        <p className="level-progress__xp">
          XP:{" "}
          <span className="level-progress__xp-amount">
            {player.playerLevel.xp} / {player.playerLevel.xpToNextLevel}
          </span>
        </p>
      </div>
      <h3 className="level-progress__reward-title">NEXT LEVEL REWARDS:</h3>
      <ul className="level-progress__reward-list">
        <li className="level-progress__reward-list-item"></li>
      </ul>
    </div>
  );
};

export default LevelProgress;
