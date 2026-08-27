/* -------------------------------------------------------------------------- */
/*                          PLAYER PROFILE COMPONENT                          */
/* -------------------------------------------------------------------------- */

import "./PlayerProfile.css";
import manaIcon from "../../../public/mana-icon.svg";
import hpIcon from "../../../public/hp-icon.svg";
import { PlayerContext } from "../../contexts/PlayerContext";
import { useContext, useEffect } from "react";

const PlayerProfile = () => {
  const { player, dispatch } = useContext(PlayerContext) || {};

  const playerAvatar = player.playerInformation.avatar || null;

  /* --------------------------- RESET DAILY/WEEKLY --------------------------- */
  useEffect(() => {
    if (!player?.dailyQuests || !player?.mainObjectives) return;

    const interval = setInterval(() => {
      const now = new Date();

      const dailyReset = player?.dailyQuests?.nextDailyReset;
      const weeklyReset = player?.mainObjectives?.nextWeeklyReset;

      if (dailyReset && new Date(dailyReset) <= now) {
        dispatch({ type: "RESET_DAILY" });
      }

      if (weeklyReset && new Date(weeklyReset) <= now) {
        dispatch({ type: "RESET_WEEKLY" });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, dispatch]);

  const hpPercent = player?.playerStatus
    ? (player.playerStatus.health / player.playerStatus.maxHealth) * 100
    : 0;

  const mpPercent = player?.playerStatus
    ? (player.playerStatus.mana / player.playerStatus.maxMana) * 100
    : 0;

  if (!player) return "Loading...";

  return (
    <div className="player-profile">
      <div className="player-profile__left-container">
        <p className="player-profile__level-label">
          LEVEL [
          <span className="player-profile__level">
            {player?.playerLevel?.level}
          </span>
          ]
        </p>
        <div className="player-profile__image-container">
          <img className="player-profile__image" src={playerAvatar} />
        </div>
      </div>

      <div className="player-profile__right-container">
        <div className="player-profile__info">
          <p className="player-profile__info-label">
            Username: {""}
            <span className="player-profile__info-text">
              {player?.playerInformation?.username}
            </span>
          </p>
          <p className="player-profile__info-label">
            Title: {""}
            <span className="player-profile__info-text">
              {player?.playerInformation?.title}
            </span>
          </p>
          <p className="player-profile__info-label">
            Class:{" "}
            <span className="player-profile__info-text">
              {player?.playerInformation?.class}
            </span>
          </p>
        </div>

        <div className="player-profile__status">
          <div className="player-profile__hp">
            <img className="player-profile__hp-icon" src={hpIcon} />
            <div className="player-profile__hp-container">
              <div className="player-profile__hp-text">
                <p className="player-profile__status-label">HP</p>
                <p className="player-profile__status-text">
                  {player?.playerStatus?.health}/
                  {player?.playerStatus?.maxHealth}
                </p>
              </div>
              <div className="player-profile__hp-bar">
                <span
                  className="player-profile__hp-bar-level"
                  style={{ width: `${hpPercent}%` }}
                ></span>
              </div>
            </div>
          </div>

          <div className="player-profile__mp">
            <img className="player-profile__mp-icon" src={manaIcon} />
            <div className="player-profile__mp-container">
              <div className="player-profile__mp-text">
                <p className="player-profile__status-label">MP</p>
                <p className="player-profile__status-text">
                  {player?.playerStatus?.mana}/{player?.playerStatus?.maxMana}
                </p>
              </div>
              <div className="player-profile__mp-bar">
                <span
                  className="player-profile__mp-bar-level"
                  style={{ width: `${mpPercent}%` }}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
