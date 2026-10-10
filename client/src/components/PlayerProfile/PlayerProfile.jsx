/* -------------------------------------------------------------------------- */
/*                          PLAYER PROFILE COMPONENT                          */
/* -------------------------------------------------------------------------- */
import "./PlayerProfile.css";
import manaIcon from "../../../public/mana-icon.svg";
import hpIcon from "../../../public/hp-icon.svg";
import { PlayerContext } from "../../contexts/PlayerContext";
import { useContext, useEffect } from "react";
import { dailyReset, weeklyReset } from "../../api/playerApi";

const PlayerProfile = () => {
  const { player, dispatch, token } = useContext(PlayerContext) || {};

  const playerAvatar = player?.playerInformation.avatar || null;

  /* --------------------------- RESET DAILY/WEEKLY --------------------------- */
  useEffect(() => {
    if (!player?.dailyQuests || !player?.mainObjectives || !token) {
      return;
    }

    const dailyResetTime = new Date(
      player.dailyQuests.nextDailyReset,
    ).getTime();

    const weeklyResetTime = new Date(
      player.mainObjectives.nextWeeklyReset,
    ).getTime();

    const resetDailyPlayer = async () => {
      try {
        const updatedPlayer = await dailyReset(token);

        dispatch({
          type: "LOAD_PLAYER",
          payload: updatedPlayer,
        });
      } catch (err) {
        console.error("Failed to reset daily quests:", err);
      }
    };

    const resetWeeklyPlayer = async () => {
      try {
        const updatedPlayer = await weeklyReset(token);

        dispatch({
          type: "LOAD_PLAYER",
          payload: updatedPlayer,
        });
      } catch (err) {
        console.error("Failed to reset weekly objectives:", err);
      }
    };

    const dailyTimeUntilReset = dailyResetTime - Date.now();
    const weeklyTimeUntilReset = weeklyResetTime - Date.now();

    const dailyTimeout = setTimeout(
      resetDailyPlayer,
      Math.max(dailyTimeUntilReset, 0),
    );

    const weeklyTimeout = setTimeout(
      resetWeeklyPlayer,
      Math.max(weeklyTimeUntilReset, 0),
    );

    return () => {
      clearTimeout(dailyTimeout);
      clearTimeout(weeklyTimeout);
    };
  }, [
    player?.dailyQuests?.nextDailyReset,
    player?.mainObjectives?.nextWeeklyReset,
    token,
    dispatch,
  ]);

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
