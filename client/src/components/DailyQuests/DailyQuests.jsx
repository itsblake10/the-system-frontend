/* -------------------------------------------------------------------------- */
/*                           DAILY QUESTS COMPONENT                           */
/* -------------------------------------------------------------------------- */
import "./DailyQuests.css";
import dailyQuestsHeadingIcon from "../../../public/daily-quests-heading-icon.svg";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import TaskItem from "../TaskItem/TaskItem";
import { getTimeLeft, formatTime } from "../../utils/countdowns";

const DailyQuests = () => {
  const { player } = useContext(PlayerContext) || {};

  if (!player?.dailyQuests?.taskList) {
    return <div>Loading...</div>;
  }

  const [timeLeft, setTimeLeft] = useState(() =>
    player?.dailyQuests?.nextDailyReset
      ? getTimeLeft(player.dailyQuests.nextDailyReset)
      : { days: 0, hours: 0, minutes: 0, seconds: 0 },
  );

  /* ----------------------------- SET DAILY RESET ---------------------------- */
  useEffect(() => {
    if (!player?.dailyQuests?.nextDailyReset) return;

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(player.dailyQuests.nextDailyReset));
    }, 1000);

    return () => clearInterval(interval);
  }, [player?.dailyQuests?.nextDailyReset]);

  return (
    <div className="daily-quests">
      <div className="daily-quests__heading-container">
        <img
          className="daily-quests__heading-icon"
          src={dailyQuestsHeadingIcon}
        />
        <h2 className="daily-quests__heading">Daily Quest</h2>
      </div>
      <h3 className="daily-quests__list-heading">GOAL</h3>
      <ul className="daily-quests__list">
        {(player.dailyQuests.taskList ?? []).map((task) => (
          <TaskItem key={task.id} task={task} section="dailyQuests" />
        ))}
      </ul>
      <p className="daily-quests__warning">
        WARNING: Failure to complete the daily quests will result in an
        appropriate <span className="daily-quests__penalty-text">penalty</span>.
      </p>
      <div className="daily-quests__countdown-container">
        <p className="daily-quests__countdown-text">TIME LEFT:</p>
        <time
          className={
            (timeLeft?.hours ?? 0) <= 2
              ? "daily-quests__countdown daily-quests__countdown_red"
              : "daily-quests__countdown"
          }
        >
          {formatTime(timeLeft)}
        </time>
      </div>
    </div>
  );
};

export default DailyQuests;
